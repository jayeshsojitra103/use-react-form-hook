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