import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productSl: ProductService) {}
  @Get()
  getProductAll(@Query('name') productName?: string): ProductDTO[] {
    if (productName) {
      return this.productSl.findCondition((product) =>
        product.name.includes(productName),
      );
    }
    return this.productSl.findAll();
  }

  @Get(':id')
  getFindById(@Param('id') id: string) {
    return this.productSl.findbyID(Number(id));
  }
}
