# active-record-dependency-injection-typescript

Active record and dependency injection are two frequently used patterns to make code loose-coupled and easier to read/modifiy. Even though there are already third-party libraries that we can easily use<sup id="note1">[1](#footnote1)</sup>, the mechanism behind them is somewhat complex. I set up this TypeScript back-end application in express to explore how active record and dependency injection work. 

## Active Record Pattern
With active record pattern, a class represents a database table, and an instance of the class represents a row in the table([Wiki](https://en.wikipedia.org/wiki/Active_record_pattern)). All the column information is stored in the instance and then synced to the database with methods like save/update/delete. 

In the example, the active record pattern is achieved with the class ActiveRecord that other classes which represent tables can extend.

## Dependency Injection
Dependency Injection is a design pattern that moves the creation and the binding of the classes outside of the class ([TutorialsTeacher](https://www.tutorialsteacher.com/ioc/dependency-injection)) With this approach the code of the class will be easier to test and we don't have to create new instances everywhere in the code.

In the example, I used TypeScript's built-in decorators to register classes in the container and I also used reflection-metadata to bind the classes' metadata to the decorators.  

<sup id="footnote1">[1](#note1)</sup>for active record, there is [TypeOrm](https://github.com/typeorm/typeorm), [Odin](https://github.com/foxifyjs/odin), and for dependency injection, there is [TSyringe](https://github.com/microsoft/tsyringe) and [InversifyJS](https://github.com/inversify/InversifyJS)
