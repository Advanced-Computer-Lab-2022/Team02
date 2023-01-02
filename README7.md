
# Online Learning Website
  
Here, you will find a wide selection of courses and tutorials covering a variety of subjects and topics. Whether you are looking to improve your professional skills, learn a new hobby, or simply expand your knowledge, we have something for you.

Our courses are designed to be interactive and engaging, featuring multimedia content and opportunities for hands-on learning. You will have the chance to learn at your own pace and revisit material as needed, making it easy to fit education into your busy schedule.

In addition to the courses, you will also have access to a community of learners and educators.

We hope you will find our online learning website to be a valuable resource for your personal and professional development. Thank you for choosing us as your educational partner.


## Motivation

The motivation for creating this online learning website is to provide a convenient and accessible platform for individuals to gain new knowledge and skills. With the increasing demand for continuing education and so much information on the internet, it can be overwhelming to try and find high-quality learning resources. 

Our goal is to provide a selection of courses and tutorials that are both informative and engaging, making it easier for people to pursue their educational goals from any place in the world.
## Build Status
The code is adaptive and working fine with no known bugs/errors in the project. 
## Code Style

- Indentation to denote code blocks.
- Naming conventions: camelCase for variable names.
- Naming conventions: PascalCase for function names. 
- The code also includes some comments, which are denoted by the // characters.
- Overall, this code follows a fairly standard style that is common in many programming languages.


## Screenshots

![Home page](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/homePageww.png)

![Individual Trainee Page](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/indT.png)

![Course Preview](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/cp.png)

![Quiz](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/quiz.png)

![Rejected Payment](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/cancel.png)

![Guest Page](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/Guestp.png)

![Sign up](file:///C:/Users/Ehab%20hesham/OneDrive/Desktop/Sup.png)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform
- Online video Tutorials
- Learning at your own pace
- Great discounts

## Usage/Examples

Here are some examples of our code

- View courses 
```javascript
const viewCourses = async (req,res) =>
{
    const courses = await Course.find({},{_id:1,title:1,hours:1,rating:1,price:1,subtitle:1,exercises:1,discount:1}).populate('subtitle')  
    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}
```
- Fetching an individual trainee Info from database
```javascript
const fetchIndAccount = async(req,res) => 
{
    const Trainee = await indTrainee.find({_id:req.user})
    console.log(Trainee)
    res.status(200).json(Trainee[0]);
}
```
- Fetch link from database

```javascript
const CoursePrev = () => 
{
    const [getLink, setgetLink] = useState("")
    useEffect(()=>{
        const handleChange = async(e) => {

            if(courseID!==null){
            console.log(courseID)
            const response = await fetch(`/guest/getLink?Id=${courseID}`, {
                method: 'GET'
            })
            const f = await response.json()
            if (response.ok){
                setgetLink(f.Link)
            }
            console.log(f.Link)
        }
    
        }
        handleChange()
    }, [])

 ```

 - Filter course based on price and subject
 
```javascript
   const Filter = async(e) => {
        const filter = {price,subject};
        const response = await fetch(`/Instructor/filterMyCourses?Id=${userId}` , {
            method : 'POST',
            body : JSON.stringify(filter),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        } )

```
## Installation

To set up the MERN stack project on your local machine, follow these steps:

- Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/download-center/community)
- Clone the repository: `git clone https://github.com/user/repo.git`
- Navigate to the project directory: `cd repo`
- Install the dependencies: `npm install`
- Create a .env file in the root directory of the project and set the following environment variables:
   - `MONGODB_URI`: the connection string for your MongoDB database
   - `JWT_SECRET`: a secret string used to sign JSON Web Tokens
- Start the development server: `npm run dev`

The development server will start and the application will be available at http://localhost:3000.

To build the production version of the app, use the `npm run build` command. The built files will be placed in the `build` directory.

#### Then install the following dependencies:-

To install the full React toolchain on WSL ,
we recommend using create-react-app:

```bash
  npx create-react-app my-app
```
To install react renderer for creating PDF files on the browser and server

```bash
  npm i @react-pdf/renderer
```
The react-router-dom package contains bindings for using React Router in web applications. 

```bash
  npm i react-router-dom
```
Fast, unopinionated, minimalist web framework for Node.js

```bash
  npm i express
```
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha).

```bash
  npm i mongoose
```

A library to help you hash passwords.

```bash
  npm i bcrypt
```

An implementation of JSON Web Tokens.

```bash
  npm i jsonwebtoken
```
##  API Reference

#### Stripe API
The Stripe API allows you to integrate payment processing into your application. With the Stripe API, you can create and manage payments, customers, and subscriptions.

#### Payment Intents
Payment Intents are used to initiate and confirm payments. You can create a Payment Intent by making a POST request to the /payment_intents endpoint, passing in the amount and currency for the payment.


```http
  curl https://api.stripe.com/v1/payment_intents \
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  -d amount=1000 \
  -d currency=usd
```
To confirm a Payment Intent, you can make a POST request to the '/payment_intents/{INTENT_ID}/' confirm endpoint.


```http
 curl https://api.stripe.com/v1/payment_intents/{INTENT_ID}/confirm \
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc:
```
#### Customers
Customers represent the people or organizations that you charge with the Stripe API. You can create a Customer by making a POST request to the /customers endpoint, passing in the customer's email address.

```http
curl https://api.stripe.com/v1/customers \
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  -d email=customer@example.com
```
You can also retrieve, update, and delete Customers with the Stripe API.

#### Subscriptions
Subscriptions allow you to charge a customer on a recurring basis. You can create a Subscription by making a POST request to the /subscriptions endpoint, passing in the customer's ID and the plan ID.

```http
curl https://api.stripe.com/v1/subscriptions \
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  -d customer=CUSTOMER_ID \
  -d items[0][plan]=PLAN_ID
```
You can also retrieve, update, and cancel Subscriptions with the Stripe API.

For more information about the Stripe API, including a complete list of available endpoints and parameters, you can visit [Stripe documentation.](https://stripe.com/docs/api).
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## How to Use?

- You will start by installing the dependencies written above.
- Every frontend page, components, etc. will be inside the following folder in the src with their names specifiying their corresponding page.
- Every backend routes, controllers, etc. will be in the backend folder inside the src with every name of the file self explaining what does it coresspond to.
- Any styling inside the project will be inside the index.css file in the frontend folder.
 
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Credits

We would like to extend our gratitude to the following people for their contributions to our online learning platform:

- Eslam Hesham 
- Mohammed Sherif
- Ehab Hesham 
- Karim Salah
- Bassel Magdy

Without the help of these individuals our platform would not be possible. Thank you!
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us at ehesham98@gmail.com

