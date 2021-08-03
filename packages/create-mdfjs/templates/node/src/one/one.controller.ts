import { Controller, Get, Header, Query } from '@mdfjs/node';
import OneService from './one.service';

/**
 * @file 请求路由
 */

@Controller('/one')
export default class OneController {
  constructor(private readonly one: OneService) {}

  @Get('/')
  index(@Query() query: any) {
    return this.one.getData();
  }
}
