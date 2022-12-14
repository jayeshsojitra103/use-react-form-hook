# use-react-form-hook

> 

[![NPM](https://img.shields.io/npm/v/use-react-form-hook.svg)](https://www.npmjs.com/package/use-react-form-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-react-form-hook
```

## Usage


## Add Page
```jsx
import React from 'react'
import { useForm } from 'use-react-form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, validate } from './utils/validators';
import './index.css';

const App = () => {
  //Pass all field details in hook
  const [formState, inputHandler, setFormData] = useForm({
    name: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }

  }, false);

  const changeHandler = (event, valid) => {
    let { id, value } = event.target;
    inputHandler(id, value, validate(value, valid))
  };

  const touchHandler = (id) => {
    const { name, email, address } = formState.inputs;
    setFormData(
      {
        ...formState.inputs,
        [id]: {

          ...formState.inputs[id],
          isTouched: true
        },
      },
      email?.isValid && address?.isValid && name?.isValid
    );
  }

  const OnFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState.inputs);

    alert(JSON.stringify(formState.inputs,null,4))
  }


  return (
    <div className='form-box'>
      <form onSubmit={OnFormSubmit}>
        <div
          className={`form-control ${!formState?.inputs?.name?.isValid && formState?.inputs?.name?.isTouched &&
            'form-control--invalid'}`}
        >

          <input
            id="name"
            type="text"
            onChange={(e) => { changeHandler(e, [VALIDATOR_REQUIRE()]) }}
            onBlur={() => { touchHandler('name') }}
          />
          {!formState?.inputs?.name?.isValid && formState?.inputs?.name?.isTouched && <p>Please enter a name.</p>}
        </div>

        <div
          className={`form-control ${!formState?.inputs?.email?.isValid && formState?.inputs?.email?.isTouched &&
            'form-control--invalid'}`}
        >

          <input
            id="email"
            type="email"
            onChange={(e) => { changeHandler(e, [VALIDATOR_EMAIL()]) }}
            onBlur={() => { touchHandler('email') }} />

          {!formState?.inputs?.email?.isValid && formState?.inputs?.email?.isTouched && <p>Please enter a valid email address</p>}
        </div>

        <div
          className={`form-control ${!formState?.inputs?.address?.isValid && formState?.inputs?.address?.isTouched &&
            'form-control--invalid'}`}
        >
          <textarea
            id="address"
            onChange={(e) => { changeHandler(e, [VALIDATOR_MINLENGTH(5)]) }}
            onBlur={() => { touchHandler('address') }}
            rows="4"
          />
          {!formState?.inputs?.address?.isValid && formState?.inputs?.address?.isTouched && <p>Please enter a valid address (at least 5 character).</p>}
        </div>

        <div className='center'>
          <button disabled={!formState.isValid} type="submit" className='button'>Submit</button>
        </div>
      </form >
    </div >
  )
}
export default App
```

### Edit Page

```jsx

import React, { useEffect, useState } from 'react'
import { useForm } from 'use-react-form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from './utils/validators';


const EditPage = () => {
    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        setFormData(
            {
                name: {
                    value: 'Jayesh Sojitra',
                    isValid: true
                },
                address: {
                    value: 'Ahmedabad, India',
                    isValid: true
                }
            },
            true
        );

    }, [])

    return (
        <div className='container'>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-8 mb-20'>
                        <div className='card pitch'>
                            <header className='auth-content'>
                                <h1>Edit Page</h1>
                            </header>
                            <form>

                                <Input
                                    id="name"
                                    type="text"
                                    label="Name"
                                    errorText="Please enter a name"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    initialValue={formState.inputs.name.value}
                                    initialValid={true}
                                />
                                <Input
                                    id="address"
                                    type="textarea"
                                    label="Address"
                                    rows="5"
                                    errorText="Please enter a address, at least 10 characters"
                                    validators={[VALIDATOR_MINLENGTH(10)]}
                                    onInput={inputHandler}
                                    initialValue={formState?.inputs?.address?.value}
                                    initialValid={true}
                                />

                                <div className="input-container center">
                                    <Button

                                        type="button"
                                        disabled={!formState.isValid}>
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-4 '>
                        <UserWidget user={auth?.user} tags={tags} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
```
## License

MIT ?? [jayeshsojitra103](https://github.com/jayeshsojitra103)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
