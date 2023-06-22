
import { HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(), 
    };
    service = new UserService(httpClientSpy);
  });

  describe('business',()=>{     

    it('should get all users by calling getAllUsers() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/learningmanagement/users';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getAllUsers();
      expect(httpClientSpy.get).toBeCalledTimes(1); 
      expect(httpClientSpy.get).toHaveBeenCalledWith(url); 
    });
        
    it('should get user by calling getUser() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/learningmanagement/users/1';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getUser(1);
      expect(httpClientSpy.get).toBeCalledTimes(1); 
      expect(httpClientSpy.get).toHaveBeenCalledWith(url); 
    });

    it('should create user by calling createUser() in service', () => {
      const data = {
        id: 1,       
        title: 'Title',
        description: 'Description',
        instructor: 'Instructor',
        duration: 'duration',
        startDate: new Date('2022-01-01'),
        endDate:new Date('2023-01-01'),
        syllabus: 'syllabus'
       };

      const res = 'some message';
      const url = 'http://127.0.0.1:8081/learningmanagement/users';
      jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
      service.createUser(data);
      expect(httpClientSpy.post).toBeCalledTimes(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url,data);
    });
  
    it('should update user by calling updateUser() in service', () => {
      const command1 = 1;
      const data = {
        id: 1,       
        title: 'Title',
        description: 'Description',
        instructor: 'Instructor',
        duration: 'duration',
        startDate: new Date('2022-01-01'),
        endDate:new Date('2023-01-01'),
        syllabus: 'syllabus'
       };
  
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/learningmanagement/users/1';
      jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(res));
      service.updateUser(data.id,data);
      expect(httpClientSpy.put).toBeCalledTimes(1);
      expect(httpClientSpy.put).toHaveBeenCalledWith(url,data);
    });
  
    it('should delete user by calling deleteUser() in service', () => {
      const command = 1;
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/learningmanagement/users/1';
      jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(res));
      service.deleteUser(1);
      expect(httpClientSpy.delete).toBeCalledTimes(1);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(API_URL);
    });
    
    it('should search user with title by calling searchByTitle() in service', () => {
  
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/learningmanagement/users/search?title=title1';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchByTitle('title1');
      expect(httpClientSpy.get).toBeCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL);
    });
    
    it('should search user with start date by calling searchByStartDate() in service', () => {
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/learningmanagement/users/search?startDate=Sun Jan 01 2023 05:30:00 GMT+0530 (India Standard Time)';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchByStartDate(new Date('2023-01-01'));
      expect(httpClientSpy.get).toBeCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL);
    });

    });  

  });



//Chat GPT test cases- also working

// describe('ProductService', () => {
//   let service: ProductService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ProductService]
//     });

//     service = TestBed.inject(ProductService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should retrieve all products', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];

//     service.getAllProducts().subscribe(products => {
//       expect(products.length).toBe(3);
//       expect(products).toEqual(mockProducts);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products');
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts);
//   });

//   //Not implemented in code

//   // it('should retrieve a product by ID', () => {
//   //   const mockProduct: Product = { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 };

//   //   service.getProductById(1).subscribe(product => {
//   //     expect(product).toEqual(mockProduct);
//   //   });

//   //   const request = httpMock.expectOne('/api/products/1');
//   //   expect(request.request.method).toBe('GET');
//   //   request.flush(mockProduct);
//   // });

//   it('should create a new product', () => {
//     const newProduct: Product = { id:1,name: 'New Product', price: 15.99, category: 'Electronics', stock: 5 };

//     service.addProduct(newProduct).subscribe(product => {
//       expect(product).toEqual(newProduct);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products');
//     expect(request.request.method).toBe('POST');
//     expect(request.request.body).toEqual(newProduct);
//     request.flush(newProduct);
//   });

//   it('should update an existing product', () => {
//     const updatedProduct: Product = { id: 1, name: 'Updated Product', price: 12.99, category: 'Electronics', stock: 8 };

//     service.updateProduct(updatedProduct).subscribe(product => {
//       expect(product).toEqual(updatedProduct);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products/1');
//     expect(request.request.method).toBe('PUT');
//     expect(request.request.body).toEqual(updatedProduct);
//     request.flush(updatedProduct);
//   });

//   it('should delete a product', () => {
//     const productId = 1;

//     service.deleteProduct(productId).subscribe(response => {
//       expect(response).toBeTruthy();
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products/1');
//     expect(request.request.method).toBe('DELETE');
//     request.flush({});
//   });


//   it('should search products by price range', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];
//     const searchPrice = 10.99;

//     service.searchProducts('', searchPrice, '').subscribe(products => {
//       expect(products.length).toBe(1);
//       expect(products[0].price).toEqual(searchPrice);
//     });

//     const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?price=${searchPrice}`);
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts.filter(p => p.price === searchPrice));
//   });

//   //Not working

//   // it('should search products by name', () => {
//   //   const mockProducts: Product[] = [
//   //     { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//   //     { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//   //     { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//   //   ];
//   //   const searchName = 'Product 1';

//   //   service.searchProducts(searchName,0,'').subscribe(products => {
//   //     expect(products.length).toBe(1);
//   //     expect(products[0].name).toEqual(searchName);
//   //   });

//   //   const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?name=${searchName}`);
//   //   expect(request.request.method).toBe('GET');
//   //   request.flush(mockProducts.filter(p => p.name === searchName));
//   // });

//   it('should search products by category', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];
//     const category = 'Electronics';

//     service.searchProducts('',0,category).subscribe(products => {
//       expect(products.length).toBe(1);
//       expect(products[0].category).toEqual(category);
//     });

//     const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?category=${category}`);
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts.filter(p => p.category === category));
//   });

// });




// import { TestBed } from '@angular/core/testing';

// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(UserService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
