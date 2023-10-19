INSERT INTO SUPPLIER (supplier_name, description) VALUES 
('Hot Toys','Se dedica a la creación de figuras de acción realistas'),
('Pop!','Se dedica a la creación de figuras con diseño funko'),
('Mattel','Se dedica a la creación de juguetes de todo tipo'),
('DC Entertaiment','Se dedica a la creación de comics, figuras de acción y demás tipo de mercancía perteneciente a presonajes de la editorial'),
('MARVEL Entertaiment','Se dedica a la creación de comics, figuras de acción y demás tipo de mercancía perteneciente a presonajes de la editorial'),
('Miniso','Se dedica a la creación de todo tipo de objetos referentes a cultura pop'),
('SONY','Se dedica a la creación de videojuegos y otros aparatos tecnológicos'),
('Microsoft','Se dedica a la creación de videojuegos y otros aparatos tecnológicos'),
('Nintendo','Se dedica a la creación de videojuegos y otros aparatos tecnológicos'),
('Suli','Crea cualquier cosa (literalmente)');


INSERT INTO CATEGORY (category_name) VALUES
('Figuras de Acción'),
('Figuras de Colección'),
('Tecnología'),
('Videojuegos'),
('Decoración'),
('Uso Personal'),
('Ropa'),
('Accesorios'),
('Comics'),
('Varios');

INSERT INTO PRODUCT (product_name, unit_price, stock, supplier_id) VALUES
('Venom Sixth Scale',1140.00,10,1),
('Aang Avatar 541',250.00,15,2),
('Flashpoint #1',475.50,5,4),
('Civil War #7',150.75,5,5),
('EA FIFA 2023 WorldCup edition PS5',450.00,15,7);

INSERT INTO PRODUCT_IMAGE (image_path, product_id) VALUES
('1-0.jpg',1),
('1-1.jpg',1),
('1-2.jpg',1),
('2-0.jpg',2),
('2-1.jpg',2),
('3-0.jpg',3),
('4-0.jpg',4),
('5-0.jpg',5);

INSERT INTO USER (username, password, first_name, last_name, birth_date, user_type) VALUES
('admin01','admin123','Carlos Alfreo','García Ovando','2000-01-01','ADMINISTRADOR'),
('user01','admin123','Juan Carlos','Gutierrez López','1999-05-05','CLIENTE');
