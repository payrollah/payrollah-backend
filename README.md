# payrollah-backend

This repo enables payrollah to store sensitive work data on a secure database. Although this means payrollah may have access to work submitted, for now, it is crucial for the operation of payrollah that work be kept on our backend so the company only may receives the final work after worker receives compensation and that only the company has access to the final work. 

We eventually plan to change this backend server to be a out of the box template for companies to fork and deploy their own version. This enables us to make payrollah decentralized by allowing companies to host final work related to their job. This can be done using a private and public key encryption to encrypt the file which key will be hidden in a commit and reveal scheme when file is uploader by worker. Only when the task is approved and worker receives compensation will the key be released for the company to access the work.

## Installation

1. Clone this repo
1. Install required modules using `npm i`
1. Setup PostgresQL locally depending on environment 
1. Start the server: `npm run dev`

## API Routes

Base Url: `https://payrollah.herokuapp.com/`

### Company

For company routes, access using `/company/...`

1. Signup
----
Allow companies to sign up with their address and a password

* **URL**

```text
  /signup
```

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**
 
   `companyId=integer`
   `companyAddress=string`
   `password=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true }`

1. Login
----
Allows the company to login with a password and returns a `JWT` token

* **URL**

```text
  /login
```

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**

   `companyAddress=string`
   `password=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ accessToken: "string", refreshToken: "string" }`

1. logout
---
Ends the login session

* **URL**

```text
  /logout
```

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**

   `token=string`

* **Success Response:**

  * **Code:** 204 <br />

### Work

For work routes, access using `/work/...`

1. Upload Image
----
Allows user to upload a image and returns a tamper-proof hash using `keccak256`

* **URL**

```text
  /upload
```

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**

    FormData
   `image=imageFile`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ uuid: "0xString", success: true }`

1. Get Watermarked Image
----
Show a down sampled watermark image as a way to preview work.

* **URL**

```text
  /watermark/:hash
```

* **Method:**

  `POST`
  
*  **Query Params**

   **Required:**

   `hash=string`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `buffered stream`

1. Get Image
----
Show a final image of work for company

* **URL**

```text
  /getImage/:jobAddress/:task
```

* **Method:**

  `POST`

*  **Header Params**

   `Authorization=Bearer eyJhbGciOiJIU...aN3Q`
  
*  **Query Params**

   **Required:**

   `jobAddress=string`
   `task=number`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{urlLink: "www.test.com"}`