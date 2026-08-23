// 1. Create a class Person with attributes name and age. Write a method to display this information.
class Person {
    name: string
    age: string
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    // Show info method
    showInfo() {
        console.log(`Name: ${this.name}, age: ${this.age}`);
    }
}
const person1: Person = new Person("Hoang", 22)
person1.showInfo()
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to display all info.
class Student extends Person {
    grade: string;
    constructor(name, age, grade) {
        super(name, age) // pass to parent contructor
        this.grade = grade
    }
    // Show info method
    showInfo() {
        console.log(`Name: ${this.name}, age: ${this.age}, grade: ${this.grade}`);
    }
}
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
// class Car {
//     brand: string
//     model: string
//     year: number
//     // Show info method
//     showInfo() {
//         console.log({
//             brand: this.brand,
//             model: this.model,
//             year: this.year
//         });
//     }
// }
// const bmw320i = new Car();
// bmw320i.brand = "BMW"
// bmw320i.model = "320i"
// bmw320i.year = 2026
// bmw320i.showInfo()
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
    width: number
    height: number
    constructor(width, height) {
        this.width  = width
        this.height = height
    }
    calculate() {
        return {
            area: this.width * this.height,
            perimeter: (this.width + this.height) * 2
        }
    }
}
const rectangle = new Rectangle(3,4);
console.log(rectangle.calculate());
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
    balance: number
    deposit(amount: number) {
        if (amount >= 0) { // can not deposit a negative number 
            this.balance += amount
        }
    }
    withdraw(amount: number) {  // can not withdraw a negative number and exceed balance
        if (amount >= 0 && amount <= this.balance) {
            this.balance -= amount
        }
    }
}
// 6. Create a class Book with attributes title, author, year.
class Book {
    title: string
    author: string
    year: number
}
// 7. Write a class User with private property name and getter/setter.
class User {
    private _name; // private value
    public get name() {
        return this._name
    }
    public set name(value) {
        this._name = value
    }
}
const user1 = new User();
user1.name = "abc" // can set name because class User has set name public method
console.log(user1);

// 8. Create a Product class with name, price. Create an array of products and filter products with price > 100.
class Product {
    name: string
    price: number
    constructor(name, price) {
        this.name = name
        this.price = price
    }
}
const product1 = new Product("Ruler",140)
const product2 = new Product("Pencil",40)
const product3 = new Product("Pen",100)
const products = [product1, product2, product3]
console.log("Product list: ",products);
const productsFiltered = products.filter(product => product.price > 100)
console.log("Product filtered list: ",productsFiltered);
// 9. Define an interface Animal with name and method sound().
// interface Animal {
//     name: string
//     sound: () => void
// }
// 10. Create a class Account with public, private and readonly fields.
class Account {
    public name: string;
    private hashPassword: string
    readonly email: string
}
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
// class Animal {
//     name: string
//     constructor(name) {
//         this.name = name    
//     }
// }
// class Dog extends Animal {
//     bark() {
//         console.log(`[${this.name}] bark bark`);
        
//     }
// }
// class Cat extends Animal {
//     meow() {
//         console.log(`[${this.name}] meow meow`);
        
//     }
// }
// const lucky = new Dog("Lucky")
// const cherry = new Cat("cherry")
// lucky.bark()
// cherry.meow()
// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
interface Flyable {
    fly: () => void
}
interface Swimmable {
    swim: () => void
}
class Bird implements Flyable {
    fly() {
        console.log("Flying"); 
    };
}
class Fish implements Swimmable {
    swim() {
        console.log("Swimming"); 
    };
}
const brid = new Bird()
brid.fly()
const fish = new Fish()
fish.swim()
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
// abstract class Shape {
//     abstract area(): number
// }
// class Square extends Shape {
//     width: number
//     constructor(width) {
//         super()
//         this.width = width
//     }

//     area(): number {
//         return this.width * this.width
//     }
// }
// class Circle extends Shape {
//     r: number
//     constructor(r) {
//         super()
//         this.r = r
//     }

//     area(): number {
//         return this.r * this.r * 3.14
//     }
// }
// const s1 = new Square(4)
// const c1 = new Circle(3)
// console.log(s1.area());
// console.log(c1.area());

// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
class Employee {
    name: string
    salary: number
}
class Manager extends Employee{
    assignTask(employeeId) {
        // do assign task...
    }
}
class Developer extends Employee {
    code() {
        // code... 
    }
}

// 15. Create a Library class that can store Book and User objects. Add method to add books.
class Library {
    books: Book[] = [] // assign defaut empty array
    users: User[] = [] // assign defaut empty array
    addBook(book: Book) {
        this.books = [...this.books, book]
    }
}
const library = new Library()
const book1 = new Book()
book1.title = "Book 1"
const book2 = new Book()
book2.title = "Book 2"
library.addBook(book1)
library.addBook(book2)
console.log(library.books);

// 16. Create a generic class Box that can store any type of value.
class Box<T> {
    list: T[] = []
    add(item: T) {
        this.list = [...this.list, item]
    }
}
const boxOfBook = new Box<Book>()
boxOfBook.add(book1)
boxOfBook.add(book2)
console.log("boxOfBook", boxOfBook.list);

// 17. Write a singleton Logger class that logs messages to console.
class Logger {
    private static instance: Logger | null = null;
    static getInstance() {
        if (Logger.instance === null) {
            Logger.instance = new Logger()
        }
        return Logger.instance
    }
    info(...messages) {
        console.log('[INFO] ', ...messages);
    }
    
    error(...messages) {
        console.log('[ERROR] ', ...messages);
    }
}
const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()
console.log("so sanh 2 instance: ", logger1 === logger2);

// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        return a / b;
    }
}
console.log("MathUtil.add(1,2) = ", MathUtil.add(1,2));
console.log("MathUtil.subtract(1,2) = ", MathUtil.subtract(1,2));
console.log("MathUtil.multiply(1,2) = ", MathUtil.multiply(1,2));
console.log("MathUtil.divide(1,2) = ", MathUtil.divide(1,2));
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
class Animal {
    name: string
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(`[${this.name}] saying`);
        
    }
}
class Dog extends Animal {
    say() { // overide method
        console.log(`[${this.name}] bark bark`);
        
    }
}
class Cat extends Animal {
    say() { // overide method
        console.log(`[${this.name}] meow meow`);
        
    }
}
const lucky = new Dog("Lucky")
const cherry = new Cat("cherry")
lucky.say()
cherry.say()
// 20. Write a Vehicle interface and implement it in Car and Bike classes.
interface Vehicle {
    make: string;
    move(): void;
}
class Car implements Vehicle {
    make: string;
    constructor(make: string) {
        this.make = make;
    }
    move(): void {
        console.log(`${this.make} đang di chuyển bằng 4 bánh trên đường bộ.`);
    }
}
class Bike implements Vehicle {
    make: string;
    constructor(make: string) {
        this.make = make;
    }


    move(): void {
        console.log(`${this.make} đang luồn lách bằng 2 bánh qua đám đông.`);
    }
}

const myCar: Vehicle = new Car("Toyota");
myCar.move();

const myBike: Vehicle = new Bike("Honda");
myBike.move();
// 21. Create a generic Repository class with methods add(), getAll().
class RepositoryGeneric<T> {
    list: T[] = []
    add(item: T) {
        [... this.list, item]
    }
    getAll(): T[] {
        return this.list
    }
}
// 22. Create a class Stack with push, pop, peek, isEmpty methods.
class Stack<T>  {
    list: T[] = []
    push(item: T) {
        this.list = [...this.list, item]
    }
    pop() {
        this.list = this.list.slice(0, this.list.length - 2)
    }
    peek() {
        return this.list[this.list.length - 1]
    }
    isEmpty() {
        return this.list.length == 0
    }
}
const stack = new Stack();
console.log(stack.list);
stack.push(2)
console.log(stack.peek());
stack.pop()
console.log(stack.peek());
console.log(stack.isEmpty());
// 23. Create an interface Payment with method pay(amount). Implement CashPayment and CardPayment.
interface Payment {
    pay(amount: number): void
}
class CashPayment implements Payment {
    pay(amount: number): void {
        console.log("pay with cash...");
        
    }
}
class CardPayment implements Payment {
    pay(amount: number): void {
        console.log("pay with card...");
        
    }
}
const cashPayment = new CashPayment()
const cardPayment = new CardPayment()
cashPayment.pay(12)
cardPayment.pay(23)
// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
abstract class Appliance  {
    abstract turnOn(): void
}
class Fan implements Appliance {
    turnOn(): void {
        console.log("turn on fan");
    }
}
class AirConditioner implements Appliance {
    turnOn(): void {
        console.log("turn on Air Conditioner");
    }
}
const fan = new Fan()
const airConditioner = new AirConditioner()
fan.turnOn()
airConditioner.turnOn()
// 25. Create a class Shape with a static method describe().
class Shape {
    static describe() {
        console.log("This is describe of shape");
        
    }
}
Shape.describe()
// 26. Create a class Order with list of products. Add method to calculate total price.

// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.

// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.

// 29. Create an interface Movable with method move(). Implement it in Car and Robot.

// 30. Create a class School with list of Students and Teachers. Add method to display info.
