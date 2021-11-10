import { Module, HttpModule } from '@mdfjs/node';
import ExampleController from './example.controller';
import ExampleService from './example.service';

/**
 * @file one module
 */

@Module({
  imports: [HttpModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export default class OneModule {}
