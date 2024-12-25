## Setup Instruction and Running The Application Steps 
This project uses Node.js (22.10.2 ver) with Express (5.0.0 ver).
```bash
npm i
npm run build
npm start
```
All the required packages will be installed using this command `npm i`.
Always build first using `npm run build` and start the server using `npm start`, whenever changes done in code.


## API Endpoints List
- Clone the github repository
- Pip install all the given requirements as provided in the installation part.
- The database is the in-memory SQLite3 so whenever changes are done in the code, the build command has to be run again which will reset the database.
- To start the server, use command: `npm start` \
  Hit the API's (in Postman or Thunderclient) in this order: 
- Post `http://localhost:3000/api/leads` or `https://kam-62ez.onrender.com/api/leads`\
  Sample input:
  ```bash
    {
        "restaurantName": "The Gourmet Hub",
        "address": "123 Food Street",
        "contactNumber": "9876543210",
        "status": "New",
        "assignedKAM": "John Doe"
    }
  ```
  This above API is for storing the restaurant leads.
- Get `http://localhost:3000/api/leads` or `https://kam-62ez.onrender.com/api/leads` \
  Sample input: No input required. \
  This will fetch the list of all the leads in the database.
- Get `http://localhost:3000/api/leads/:id` or `https://kam-62ez.onrender.com/api/leads/:id` \
  Sample input: id (in the url) \
  This will fetch the details of lead with provided lead id.
- Get `http://localhost:3000/api/lead-search` or `https://kam-62ez.onrender.com/api/lead-search` \
  Sample input: (provide in the query params)
  ```bash
  query : "Hub"
  status : "New"
  assignedKAM : "John Doe" 
  ```
  This will search the leads and provide details of the leads according to the query (search done in restaurant name), status, assignedKAM given.
- Put `http://localhost:3000/api/leads/:id` or `https://kam-62ez.onrender.com/api/leads/:id` \
  Sample input: Provide id in the url. Can provide any of the lead attribute in the request body.
  ```bash
    {
        "restaurantName": "The Indian Hub",
        "address": "145 Food Street",
        "contactNumber": "9811543210",
        "status": "Active",
        "assignedKAM": "Emily"
    }
  ```
  This API will update the lead entry as per given id, according to the given data in request body. 
- Delete `http://localhost:3000/api/leads/:id` or `https://kam-62ez.onrender.com/api/leads/:id` \
  Sample input: Provide id in url. \
  This API will delete the lead entry in the database.
- Post `http://localhost:3000/api/contacts` or `https://kam-62ez.onrender.com/api/contacts` \
  Sample input:
  ```bash
    {
        "name": "Emily Smith",
        "role": "Manager",
        "phoneNumber": "9123456780",
        "email": "emily.smith@example.com",
        "leadId": 1
    }
  ```
  This above API is for storing the contact information of the restaurant (associated with the lead id).
- Get `http://localhost:3000/api/contacts/:leadId` or `https://kam-62ez.onrender.com/api/contacts/:leadId` \
  Sample input: Provide lead id in the url. \
  This API fetches the contact details of the restaurant associated with the given lead id.
- Post `http://localhost:3000/api/interactions` or `https://kam-62ez.onrender.com/api/interactions` \
  Sample input:
  ```bash
    {
        "date": "2024-12-26T10:00:00.000Z",
        "type": "Call",
        "notes": "Discussed pricing details",
        "followUpRequired": true,
        "leadId": 1
    }
  ```
  This above API is for recording the interaction with the resataurant associated with the lead id.
- Get `http://localhost:3000/api/interactions/:leadId` or `https://kam-62ez.onrender.com/api/interactions/:leadId` \
  Sample input: Provide lead id in the url. \
  This above API fetches the recent interaction details according to the lead id provided.
- Get `http://localhost:3000/api/interactions/todays-pending-calls` or `https://kam-62ez.onrender.com/api/interactions/todays-pending-calls` \
  Sample input: No input required. \
  This API fetches interaction details of the current day where attribute type is 'Call' and attribute followUpRequired is true.
- Put `http://localhost:3000/api/interactions/followUp/:id` or `https://kam-62ez.onrender.com/api/interactions/followUp/:id` \
  Sample input: Interaction id to be provided in the url.
  ```bash
    {
        "followUpRequired": false
    }
  ```
This API is to update the followUpRequired of given interaction id.


## Deployment
This backend project is deployed on Render (its a free instance so it might spin down with inactivity delaying the service by 50 seconds).
The deployed URL is : `https://kam-62ez.onrender.com/`.
So without even starting the backend server, one can easily hit the APIs using this URL. 
Just replace the `http://localhost:3000/` with the above given URL.