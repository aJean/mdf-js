import { Controller, Get, Header, Query } from '@mdfjs/node';
import ExampleService from './example.service';

/**
 * @file 请求路由
 */

@Controller('/example')
export default class ExampleController {
  constructor(private server: ExampleService) {}

  @Get('/data')
  index(@Query() query: any) {
    return this.server.getData();
  }

  @Get('/check')
  check() {
    return this.server.checkData();
  }
}
