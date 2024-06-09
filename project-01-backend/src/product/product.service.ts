import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';

@Injectable()
export class ProductService {
  private product: ProductDTO[] = [
    {
      name: 'apple',
      price: 200,
      id: 1,
    },
    {
      name: 'banana',
      price: 400,
      id: 2,
    },
  ];
  findAll(): ProductDTO[] {
    return this.product;
  }
  findbyID(id: number) {
    return this.product.find((p) => p.id === id);
  }
  findCondition(predicate: (product: ProductDTO) => boolean) {
    return this.product.filter((p) => predicate(p));
  }
}
