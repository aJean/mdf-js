import { NextFunction, Request, Response } from 'express';

/**
 * @file server 路由中间件，更加可控
 *       服务状态控制台展示
 *       gen html，不依赖 html-webpack-plugin
 *       服务端渲染、static server、ws 通信、proxy
 */

export default async function (req: Request, res: Response, next: NextFunction) {
  if (req.path === '/favicon.ico') {
    res.status(204);
  }

  res.setHeader('x-mdf-server', '0.0.0');
  next();
}

function generateHtml() {
  return '';
}