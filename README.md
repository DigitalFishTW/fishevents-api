#Login
##Register
###**PUT** /auth
####Request
```
{
  username,
  password
}
```

####Response
```
HTTP Code
  - 201 Created
  - 226 IM Used
  - 500 Internal Server Error
```

##Login
###**GET** /auth?username=&password=

####Response
```
HTTP Code
  - 200 Found
  - 403 Forbidden
  - 500 Internal Server Error
{
  token
}
```

##Get Username
###**GET** /username

####Response
```
HTTP Code
  - 200 Found
  - 403 Forbidden
  - 500 Internal Server Error
{
  username
}
```

##Update Password
###**PATCH** /auth/:password?token=
####Request
```
[
  { "op": "replace", "path": "/password", "value": "pw" }
]
```

####Response
```
HTTP Code
  - 200 Found
  - 403 Forbidden
  - 500 Internal Server Error
```


#Profile
##Add Profile
###**PUT** /profile?token=
####Request
```
{
  create_time,
  last_edit,
  first_name,
  middle_name,
  last_name,
  email,
  zip,
  address,
  city,
  states,
  country_code,
  birth,
  gender,
  bio,
  licenses: [license_id1, license_id2, license_id3...]
  phones: [{title1, phone1}, {title2, phone2}, {title3, phoen3}...]
}
```

####Response
```
HTTP Code
  - 201 Created
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get Profile List
###**GET** /profile?token=
```
{
  offset,
  limit,
  fields: [field1, field2, field3...]
}
```


```
HTTP Code
  - 200 Found
  - 403 Forbidden
  - 500 Internal Server Error
{
  [
    {id, first_name, middle_name, last_name, [field]},
    {id, first_name, middle_name, last_name, [field]},
    ...
    {id, first_name, middle_name, last_name, [field]}
  ]
}
```

##Get One Profile
###**GET** /profile/:id?token=
####Response
```
{
  create_time,
  last_edit,
  first_name,
  middle_name,
  last_name,
  email,
  zip,
  address,
  city,
  states,
  country_code,
  birth,
  gender,
  bio,
  licenses: [license_id1, license_id2, license_id3...]
  phones: [{title1, phone1}, {title2, phone2}, {title3, phoen3}...]
}
```

####Response
```
HTTP Code
  - 200 Found
  - 403 Forbidden
  - 500 Internal Server Error
```

##Modify Profile
###**PATCH** /profile/:id?token＝
####Request
```
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo"}
]
```

####Response
```
HTTP Code
  - 200 Found
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

