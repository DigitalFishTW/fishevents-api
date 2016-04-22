#Login
##Register
###**PUT** /auth
####Request
```
{
  username,
  hashed_password
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
###**GET** /auth
####Request
```
{
  username,
  hashed_password
}
```

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

##Update Password
###**PATCH** /auth/:username/:hashed_password
####Request
```
[
  { "op": "replace", "path": "/hashed_password", "value": "pw" }
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
###**PUT** /profile
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

##Get profile list
###**GET** /profile
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

##Get one profile
###**GET** /profile/:id
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

##Modify profile
###**PATCH** /profile/:id
```
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo"}
]
```


