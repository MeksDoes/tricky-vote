import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';

jest.mock('@nestjs/swagger', () => {
  const actual = jest.requireActual<NestFactoryStatic>('@nestjs/swagger');
  return {
    ...actual,
    SwaggerModule: {
      createDocument: jest.fn().mockReturnValue({}),
      setup: jest.fn(),
    },
  };
});

jest.mock('@nestjs/core', () => ({
  NestFactory: { create: jest.fn() },
}));

describe('bootstrap (main.ts)', () => {
  const useGlobalPipes = jest.fn();
  const enableCors = jest.fn();
  const listen = jest.fn();
  const fakeApp = { useGlobalPipes, enableCors, listen };

  beforeEach(() => {
    process.env.FE_SERVICE_WHITELIST_URL = 'https://example.com';
    process.env.PORT = '1234';

    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(fakeApp);
  });

  it('configures ValidationPipe globally', async () => {
    const { bootstrap } = await import('./main');
    await bootstrap();

    expect(fakeApp.useGlobalPipes).toHaveBeenCalledWith(expect.any(ValidationPipe));
  });

  it('enables CORS with the correct origin', async () => {
    const whiteListUrl = 'https://example.com';
    process.env.FE_SERVICE_WHITELIST_URL = whiteListUrl;
    const { bootstrap } = await import('./main');
    await bootstrap();

    expect(fakeApp.enableCors).toHaveBeenCalledWith({
      origin: whiteListUrl,
    });
  });

  it('initializes Swagger documentation', async () => {
    const { bootstrap } = await import('./main');
    await bootstrap();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(SwaggerModule.createDocument).toHaveBeenCalledWith(fakeApp, expect.any(Object));
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(SwaggerModule.setup).toHaveBeenCalledWith('api', fakeApp, {});
  });

  describe('Port', () => {
    it('should use process.env.PORT', async () => {
      const port = '1234';
      process.env.PORT = port;

      const { bootstrap } = await import('./main');
      await bootstrap();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(fakeApp.listen.mock.calls[0][0]).toBe(port);
    });

    it('should default port to 3000 if not set', async () => {
      delete process.env.PORT;

      const { bootstrap } = await import('./main');
      await bootstrap();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(fakeApp.listen.mock.calls[0][0]).toBe(3000);
    });
  });
});
