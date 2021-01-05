# Zappts API

https://api-zappts.herokuapp.com/

# Endpoints

## GET /
> &nbsp;
>
> To check if API is online
>
> **Response**
>
> _Status: 200 (text/plain)_
>
> **cURL**
>
> ```
> curl --location --request GET 'https://api-zappts.herokuapp.com/'
> ```
> &nbsp;

## POST /authenticate
> &nbsp;
>
> Route to identify yourself and access the token
> The system has 3 users: **santa-claus**, **good-child**, **bad-child**.
> All with password: **123123123**
> 
> **Params**
>
> - username
> - password
>
> **Response**
>
> _Status: 200 (application/json)_
>
> **cURL**
>
> ```
> curl --location --request POST 'https://api-zappts.herokuapp.com/authenticate' \
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'username=santa-claus' \
> --data-urlencode 'password=123123123'
>```
> &nbsp;

# All of the following endpoints need an Authorization Token in the Header

## POST /current-user
> &nbsp;
>
> Route to check if the token is still valid and the data of the respective user
>
> **Response**
>
> _Status: 200 (application/json)_
>
> **cURL**
>
> ```
> curl --location --request POST 'https://api-zappts.herokuapp.com/current-user' \
> --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTYwOTY2NDA3OX0.O80W7_IF5x4hau511Y1IbAEIKnDUO61JccZHYxr2FD0'
>```
> &nbsp;

## GET /letters
> &nbsp;
>
> **Params**
>
> - page (optional / Default: 1)
> - order (optional / Default: 'DESC')
>
> **Response**
>
> _Status: 200 (application/json)_
>
> **cURL**
>
> ```
> curl --location --request GET 'https://api-zappts.herokuapp.com/letters' \
>--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwOTcwMDgyN30.d2Rg8C8iLfKSmO1IRFQIhsaY1KjuL8WjFEONWhLL6nE'
>```
> &nbsp;

## POST /letters
> &nbsp;
>
> Route to insert a letter
>
> **Params**
>
> - title (required)
> - body (required)
>
> **Response**
>
> _Status: 200 (application/json)_
>
> **cURL**
>
> ```
> curl --location --request POST 'https://api-zappts.herokuapp.com/letters' \
> --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwOTcwMDgyN30.d2Rg8C8iLfKSmO1IRFQIhsaY1KjuL8WjFEONWhLL6nE' \
> --form 'title="Lorem ipsum"' \
> --form 'body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a diam sit amet purus tempus rhoncus efficitur in eros."'
>```
> &nbsp;

## PUT /letters/:uuid
> &nbsp;
>
> Route to update a letter
>
> **Params**
>
> - title (optional)
> - body (optional)
>
> **Response**
>
> _Status: 200 (application/json)_
>
> **cURL**
>
> ```
> curl --location --request PUT 'https://api-zappts.herokuapp.com/letters/c6d2666c-151c-4ea6-aa6d-8ff55f742148' \
> --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwOTcwMDgyN30.d2Rg8C8iLfKSmO1IRFQIhsaY1KjuL8WjFEONWhLL6nE' \
> --form 'title="Updated - Lorem Ipsum"' \
> --form 'body="Updated - Dolor sit amet, consectetur adipiscing elit."'
>```
> &nbsp;

## DELETE /letters/:uuid
> &nbsp;
>
> Route to delete a letter
>
> **Response**
>
> _Status: 204 - No Content_
>
> **cURL**
>
> ```
> curl --location --request DELETE 'https://api-zappts.herokuapp.com/letters/c6d2666c-151c-4ea6-aa6d-8ff55f742148' \
> --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTYwOTYxMjk5OH0.eD4yBcoKoEAGCslTKFqEB5EaXLJh-URbomSBl5fS118'
>```
> &nbsp;

## GET /letters/:uuid
> &nbsp;
>
> Route to show a letter
>
> **Response**
>
> _Status: 200 - (application/json)_
>
> **cURL**
>
> ```
> curl --location --request GET 'https://api-zappts.herokuapp.com/letters/c6d2666c-151c-4ea6-aa6d-8ff55f742148' \
> --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwOTcwMDgyN30.d2Rg8C8iLfKSmO1IRFQIhsaY1KjuL8WjFEONWhLL6nE'
>```
> &nbsp;
