// Module dependencies
const   mongoose = require('mongoose'),
        Customer = require('../models/customer'),
        State = require('../models/state'),
        Department = require('../models/department'),
        Designation = require('../models/designation'),
        Employee = require('../models/employee'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {
    
    init() {
        mongoose.connection.db.listCollections({name: 'customers'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }
    
    seed() {

        console.log('Seeding data....');

        //Customers
        var customerNames =
        [
            "Marcus,HighTower,Male,acmecorp.com",
            "Jesse,Smith,Female,gmail.com",
            "Albert,Einstein,Male,outlook.com",
            "Dan,Wahlin,Male,yahoo.com",
            "Ward,Bell,Male,gmail.com",
            "Brad,Green,Male,gmail.com",
            "Igor,Minar,Male,gmail.com",
            "Miško,Hevery,Male,gmail.com",
            "Michelle,Avery,Female,acmecorp.com",
            "Heedy,Wahlin,Female,hotmail.com",
            "Thomas,Martin,Male,outlook.com",
            "Jean,Martin,Female,outlook.com",
            "Robin,Cleark,Female,acmecorp.com",
            "Juan,Paulo,Male,yahoo.com",
            "Gene,Thomas,Male,gmail.com",
            "Pinal,Dave,Male,gmail.com",
            "Fred,Roberts,Male,outlook.com",
            "Tina,Roberts,Female,outlook.com",
            "Cindy,Jamison,Female,gmail.com",
            "Robyn,Flores,Female,yahoo.com",
            "Jeff,Wahlin,Male,gmail.com",
            "Danny,Wahlin,Male,gmail.com",
            "Elaine,Jones,Female,yahoo.com",
            "John,Papa,Male,gmail.com"
        ];
        var addresses =
        [
            "1234 Anywhere St.",
            "435 Main St.",
            "1 Atomic St.",
            "85 Cedar Dr.",
            "12 Ocean View St.",
            "1600 Amphitheatre Parkway",
            "1604 Amphitheatre Parkway",
            "1607 Amphitheatre Parkway",
            "346 Cedar Ave.",
            "4576 Main St.",
            "964 Point St.",
            "98756 Center St.",
            "35632 Richmond Circle Apt B",
            "2352 Angular Way",
            "23566 Directive Pl.",
            "235235 Yaz Blvd.",
            "7656 Crescent St.",
            "76543 Moon Ave.",
            "84533 Hardrock St.",
            "5687534 Jefferson Way",
            "346346 Blue Pl.",
            "23423 Adams St.",
            "633 Main St.",
            "899 Mickey Way"
        ];

        var citiesStates =
        [
            "Phoenix,AZ,Arizona",
            "Encinitas,CA,California",
            "Seattle,WA,Washington",
            "Chandler,AZ,Arizona",
            "Dallas,TX,Texas",
            "Orlando,FL,Florida",
            "Carey,NC,North Carolina",
            "Anaheim,CA,California",
            "Dallas,TX,Texas",
            "New York,NY,New York",
            "White Plains,NY,New York",
            "Las Vegas,NV,Nevada",
            "Los Angeles,CA,California",
            "Portland,OR,Oregon",
            "Seattle,WA,Washington",
            "Houston,TX,Texas",
            "Chicago,IL,Illinois",
            "Atlanta,GA,Georgia",
            "Chandler,AZ,Arizona",
            "Buffalo,NY,New York",
            "Albuquerque,AZ,Arizona",
            "Boise,ID,Idaho",
            "Salt Lake City,UT,Utah",
            "Orlando,FL,Florida"
        ];

        var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17];


        var zip = 85229;

        var orders =
        [
        { "product": "Basket", "price": 29.99, "quantity": 1 },
        { "product": "Yarn", "price": 9.99, "quantity": 1 },
        { "product": "Needes", "price": 5.99, "quantity": 1 },
        { "product": "Speakers", "price": 499.99, "quantity": 1 },
        { "product": "iPod", "price": 399.99, "quantity": 1 },
        { "product": "Table", "price": 329.99, "quantity": 1 },
        { "product": "Chair", "price": 129.99, "quantity": 4 },
        { "product": "Lamp", "price": 89.99, "quantity": 5 },
        { "product": "Call of Duty", "price": 59.99, "quantity": 1 },
        { "product": "Controller", "price": 49.99, "quantity": 1 },
        { "product": "Gears of War", "price": 49.99, "quantity": 1 },
        { "product": "Lego City", "price": 49.99, "quantity": 1 },
        { "product": "Baseball", "price": 9.99, "quantity": 5 },
        { "product": "Bat", "price": 19.99, "quantity": 1 }
        ];

        Customer.remove({});

        var l = customerNames.length,
            i,
            j,
            firstOrder,
            lastOrder,
            tempOrder,
            n = orders.length;

        for (i = 0; i < l; i++) {
            var nameGenderHost = customerNames[i].split(',');
            var cityState = citiesStates[i].split(',');
            var state = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
            var customer = new Customer({
                'firstName': nameGenderHost[0],
                'lastName': nameGenderHost[1],
                'email': nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3],
                'address': addresses[i],
                'city': cityState[0],
                'state': state,
                'stateId': citiesIds[i],
                'zip': zip + i,
                'gender': nameGenderHost[2],
                'orderCount': 0
            });
            firstOrder = Math.floor(Math.random() * orders.length);
            lastOrder = Math.floor(Math.random() * orders.length);
            if (firstOrder > lastOrder) {
                tempOrder = firstOrder;
                firstOrder = lastOrder;
                lastOrder = tempOrder;
            }

            customer.orders = [];
            //console.log('firstOrder: ' + firstOrder + ", lastOrder: " + lastOrder);
            for (j = firstOrder; j <= lastOrder && j < n; j++) {
                var today = new Date();
                var tomorrow = new Date();
                tomorrow.setDate(today.getDate() + (Math.random() * 100));

                var o = {
                    "product": orders[j].product,
                    "price": orders[j].price,
                    "quantity": orders[j].quantity,
                    "date": tomorrow
                };
                customer.orders.push(o);
            }
            customer.orderCount = customer.orders.length;

            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.firstName + ' ' + cust.lastName);
                }
            });
        }

        //States
        var states = [
        { "name": "Alabama", "abbreviation": "AL" },
        { "name": "Montana", "abbreviation": "MT" },
        { "name": "Alaska", "abbreviation": "AK" },
        { "name": "Nebraska", "abbreviation": "NE" },
        { "name": "Arizona", "abbreviation": "AZ" },
        { "name": "Nevada", "abbreviation": "NV" },
        { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "New Hampshire", "abbreviation": "NH" },
        { "name": "California", "abbreviation": "CA" },
        { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "Colorado", "abbreviation": "CO" },
        { "name": "New Mexico", "abbreviation": "NM" },
        { "name": "Connecticut", "abbreviation": "CT" },
        { "name": "New York", "abbreviation": "NY" },
        { "name": "Delaware", "abbreviation": "DE" },
        { "name": "North Carolina", "abbreviation": "NC" },
        { "name": "Florida", "abbreviation": "FL" },
        { "name": "North Dakota", "abbreviation": "ND" },
        { "name": "Georgia", "abbreviation": "GA" },
        { "name": "Ohio", "abbreviation": "OH" },
        { "name": "Hawaii", "abbreviation": "HI" },
        { "name": "Oklahoma", "abbreviation": "OK" },
        { "name": "Idaho", "abbreviation": "ID" },
        { "name": "Oregon", "abbreviation": "OR" },
        { "name": "Illinois", "abbreviation": "IL" },
        { "name": "Pennsylvania", "abbreviation": "PA" },
        { "name": "Indiana", "abbreviation": "IN" },
        { "name": "Rhode Island", "abbreviation": "RI" },
        { "name": "Iowa", "abbreviation": "IA" },
        { "name": "South Carolina", "abbreviation": "SC" },
        { "name": "Kansas", "abbreviation": "KS" },
        { "name": "South Dakota", "abbreviation": "SD" },
        { "name": "Kentucky", "abbreviation": "KY" },
        { "name": "Tennessee", "abbreviation": "TN" },
        { "name": "Louisiana", "abbreviation": "LA" },
        { "name": "Texas", "abbreviation": "TX" },
        { "name": "Maine", "abbreviation": "ME" },
        { "name": "Utah", "abbreviation": "UT" },
        { "name": "Maryland", "abbreviation": "MD" },
        { "name": "Vermont", "abbreviation": "VT" },
        { "name": "Massachusetts", "abbreviation": "MA" },
        { "name": "Virginia", "abbreviation": "VA" },
        { "name": "Michigan", "abbreviation": "MI" },
        { "name": "Washington", "abbreviation": "WA" },
        { "name": "Minnesota", "abbreviation": "MN" },
        { "name": "West Virginia", "abbreviation": "WV" },
        { "name": "Mississippi", "abbreviation": "MS" },
        { "name": "Wisconsin", "abbreviation": "WI" },
        { "name": "Missouri", "abbreviation": "MO" },
        { "name": "Wyoming", "abbreviation": "WY" }
        ];

        var l = states.length,
            i;

        State.remove({});

        for (i = 0; i < l; i++) {
            var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
            state.save((err, stat) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted states: ' + stat.name);
                }
            });
        }


        //Department
        var departments = [
        { "departmentName": "RnD", "description": "Here we implement all research and develoment products." },
        { "departmentName": "WebDev", "description": "All web developemtns are handled under this department." },
        { "departmentName": "Standalone", "description": "Standalone developments using all languages are handeled by us." },
        { "departmentName": "APIdev", "description": "API developments unde api team" }
        ];
    
        var l = departments.length,
            i;

        Department.remove({});

        for (i = 0; i < l; i++) {
            var department = new Department ({ 'id': i + 1, 'departmentName': departments[i].departmentName, 'description': departments[i].description });
            department.save((err, dept) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted departments: ' + dept.departmentName);
                }
            });
        }


        //Designations
        var designations = [
            { "designationName": "Intern", "description": "Intern Software Engineer" },
            { "designationName": "ASE", "description": "Assosiate Software Engineer" },
            { "designationName": "SE", "description": "Software Engineer" },
            { "designationName": "SSE", "description": "Senior  Software Engineer" },
            { "designationName": "ATL", "description": "Technical Lead" }
            ];
        
            var l = designations.length,
                i;
    
            Designation.remove({});
    
            for (i = 0; i < l; i++) {
                var designation = new Designation ({ 'id': i + 1, 'designationName': designations[i].designationName, 'description': designations[i].description });
                designation.save((err, desg) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('inserted designations: ' + desg.designationName);
                    }
                });
            }

            //Employees
            var employeesNames =
            [
                "Nimal,Perera,Male,acmecorp.com",
                "Sunil,Fernando,Female,gmail.com",
                "Kamal,Silva,Male,outlook.com",
                "Vimal,Almeida,Male,yahoo.com",
                "Ramal,Siripala,Male,gmail.com",
                "Samal,Alponsu,Male,gmail.com",
                "Bimal,Zoiza,Male,gmail.com",
                "Amal,Soisa,Male,gmail.com",
                "Namal,Zoysa,Female,acmecorp.com",
                "Sirimal,Dayasena,Female,hotmail.com",
                "Surimal,Martin,Male,outlook.com",
                "Sunimal,Martin,Female,outlook.com",
                "Bimmal,Cleark,Female,acmecorp.com"
            ];
            var empAddresses =
            [
                "1234 Anywhere St.",
                "435 Main St.",
                "1 Atomic St.",
                "85 Cedar Dr.",
                "12 Ocean View St.",
                "1600 Amphitheatre Parkway",
                "1604 Amphitheatre Parkway",
                "1607 Amphitheatre Parkway",
                "346 Cedar Ave.",
                "4576 Main St.",
                "964 Point St.",
                "98756 Center St.",
                "35632 Richmond Circle Apt B"
            ];

            var empCitiesStates =
            [
                "Phoenix,AZ,Arizona",
                "Encinitas,CA,California",
                "Seattle,WA,Washington",
                "Chandler,AZ,Arizona",
                "Dallas,TX,Texas",
                "Orlando,FL,Florida",
                "Carey,NC,North Carolina",
                "Anaheim,CA,California",
                "Dallas,TX,Texas",
                "New York,NY,New York",
                "White Plains,NY,New York",
                "Las Vegas,NV,Nevada",
                "Los Angeles,CA,California"
            ];
            
            var departmentDesignations =
            [
                "RnD,Here we implement all research and develoment products.,Intern,Intern Software Engineer",
                "WebDev,All web developemtns are handled under this department.,ASE,Assosiate Software Engineer",
                "Standalone,Standalone developments using all languages are handeled by us.,SE,Software Engineer",
                "APIdev,API developments unde api team,SSE,Senior  Software Engineer",
                "RnD,Here we implement all research and develoment products.,ATL,Technical Lead",
                "RnD,Here we implement all research and develoment products.,SSE,Senior  Software Engineer",
                "WebDev,All web developemtns are handled under this department.,SE,Software Engineer",
                "Standalone,Standalone developments using all languages are handeled by us.,ATL,Technical Lead",
                "APIdev,API developments unde api team,Intern,Intern Software Engineer",
                "RnD,Here we implement all research and develoment products.,SSE,Senior  Software Engineer",
                "Standalone,Standalone developments using all languages are handeled by us.,ATL,Technical Lead",
                "APIdev,API developments unde api team,SE,Software Engineer",
                "RnD,Here we implement all research and develoment products.,SE,Software Engineer"
            ];
            

            var departmentIds = [1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 3, 4, 1];
            
            var designationIds = [1, 2, 3, 4, 5, 4, 3, 5, 1, 4, 5, 3, 3];


            var zip = 85229;

            Employee.remove({});

            var l = employeesNames.length, 
                i;

            for (i = 0; i < l; i++) {
                var employeeNames = employeesNames[i].split(',');
                var empCityState = empCitiesStates[i].split(',');
                var state = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
                
                var departmentDesignation = departmentDesignations[i].split(',');
                var department = { 'id': departmentIds[i], 'departmentName': departmentDesignation[0], 'description': departmentDesignation[1] };
                var designation = { 'id': designationIds[i], 'designationName': departmentDesignation[2], 'description': departmentDesignation[3] };
                
                var employee = new Employee({
                    'firstName': employeeNames[0],
                    'lastName': employeeNames[1],
                    'email': employeeNames[0] + '.' + employeeNames[1] + '@' + employeeNames[3],
                    'designation': designation,
                    'designationId': designationIds[i],
                    'department': department,
                    'departmentId': departmentIds[i],
                    'address': empAddresses[i],
                    'city': empCityState[0],
                    'state': state,
                    'stateId': citiesIds[i],
                    'zip': zip + i,
                    'gender': employeeNames[2]
                });

                employee.save((err, empo) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('inserted employee: ' + empo.firstName + ' ' + empo.lastName);
                    }
                });
            }

    }
}

module.exports = new DBSeeder();




