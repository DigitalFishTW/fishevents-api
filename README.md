#Login
##Register
###**PUT** /auth
####Request
```
{
  login,
  hashed_password
}
```

####Response
```
HTTP Code
  - 200
  - 403
  - 500
```

##Login
###**GET** /auth
####Request
```
{
  login,
  hashed_password
}
```

####Response
```
HTTP Code
  - 200
  - 403
  - 500
{
  token
}
```

##Update Password
###**PATCH** /auth/:login/:hashed_password
####Request
```
[
  { "op": "replace", "path": "/hashed_password", "value": "pw" }
]
```

####Response
```
HTTP Code
  - 200
  - 403
  - 500
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

##Modify profile
###**PATCH** /profile/:id
```
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo"}
]
```


