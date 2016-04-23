#Auth
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
  - 400 Bad Request
  - 500 Internal Server Error
```

##Login
###**GET** /auth?username=&password=

####Response
```
HTTP Code
  - 200 Found
    {
      token
    }
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get Username
###**GET** /username?token=

####Response
```
HTTP Code
  - 200 Found
    {
      username
    }
  - 403 Forbidden
  - 500 Internal Server Error
```

##Logout
###**DELETE** /auth?token=
####Response
```
  - 200 Found
  - 401 Unauthorized
  - 500 Internal Server Error
```

##Update Password
###**PATCH** /auth/:old_password?token=
####Request
```
{
  new_password
}
```

####Response
```
HTTP Code
  - 200 Found
  - 401 Unauthorized
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
  name: {
    first,
    middle,
    last
  },
  type,
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
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get Profile List
###**GET** /profile?token=&offset=&limit=
####Response
```
HTTP Code
  - 200 Found
    {
      [
        {Object},
        {Object},
        ...
        {Object}
      ]
    }
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get My Profile
###**GET** /profile/my?token=
####Response
```
HTTP Code
  - 200 Found
    {
      create_time,
      last_edit,
      name: {
        first,
        middle,
        last
      },
      type,
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
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get One Profile
###**GET** /profile/:id?token=
####Response
```
HTTP Code
  - 200 Found
    {
      create_time,
      last_edit,
      name: {
        first,
        middle,
        last
      },
      type,
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
  - 401 Unauthorized
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

#Vessel
##Add New Vessel
###**PUT** /vessel?token=
####Request
```
{
  name,
  imo,
  mmsi,
  identify,
  gears: [gear1, gear2, gear3...],
  chars: [char1, char2, char3...],
  radio,
  flag,
  ais_type,
  gross_tonnage,
  deadweight,
  length,
  breadth,
  year,
  status,
  home_port,
  licenses: [license_id1, license_id2, license_id3...]
}
```

####Response
```
HTTP Code
  - 201 Created
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get Vessel List
###**GET** /vessel?token=&offset=&limit=
####Response
```
HTTP Code
  - 200 Found
    {
      [
        {Object},
        {Object},
        ...
        {Object}
      ]
    }
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get One Vessel Profile
###**GET** /vessel/:id?token=
####Response
```
HTTP Code
  - 200 Found
    {
      name,
      imo,
      mmsi,
      identify,
      gears: [gear1, gear2, gear3...],
      chars: [char1, char2, char3...],
      radio,
      flag,
      ais_type,
      gross_tonnage,
      deadweight,
      length,
      breadth,
      year,
      status,
      home_port,
      licenses: [license_id1, license_id2, license_id3...]
    }
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

#Catch
##Add Catch Record
###**PUT** /catch?token
####Resquest
```
{
    total: {
        weight,
        counts
    },
    selling,
    permit,
    species: {
        profile,
        weight,
        sold,
        pricing
    }
}
```

####Respopnse
```
HTTP Code
  - 201 Created
  - 400 Bad Request
  - 500 Internal Server Error
```

##Get Catch List
###**GET** /catch?token=&offset=&limit=
####Response
```
HTTP Code
  - 200 Found
    {
      [
        {Object},
        {Object},
        ...
        {Object}
      ]
    }
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

##Get One Catch Detail
###**GET** /catch/:id?token=
####Response
```
HTTP Code
  - 200 Found
    {
      total: {
        weight,
        counts
      },
      selling,
      permit,
      species: {
        profile,
        weight,
        sold,
        pricing
      }
    }
  - 401 Unauthorized
  - 403 Forbidden
  - 500 Internal Server Error
```

