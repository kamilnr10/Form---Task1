import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import is from "is_js";

const ErrorsList = ({ errors }) => {
  return (
    <div className="alert alert-danger">
      <ul>
        {errors.map((error, key) => {
          return <li key={key}>{error}</li>;
        })}
      </ul>
    </div>
  );
};

const SuccesMsg = ({}) => {
  return (
    <div className="alert alert-succes">
      <h1>Formularz wysłany</h1>
    </div>
  );
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      errors: [],
      imBusy: false,
      imSucces: false
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setInputValue(ev) {
    const { name, type, value } = ev.target;
    // console.log("name", name);
    // console.log("type", type);
    // console.log("value", value);

    this.setState({
      [name]: value
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    // console.log(this.state);

    const { name, email, phone } = this.state;
    // console.log("is text", is.all.string(name));
    // console.log("is name typeof", typeof name);
    // console.log("is email", is.email(email));
    // console.log("is number", is.number(Number(phone)));

    const actualError = [];

    console.log(phone.length);
    if (!is.all.string(name) || name.length <= 3) {
      console.log("imię jest niepoprawne");
      actualError.push("imię jest niepoprawne");
    }
    if (!is.email(email)) {
      console.log("email jest niepoprawny");
      actualError.push("email jest niepoprawne");
    }
    if (!is.number(Number(phone)) || (phone.length < 9 || phone.length > 9)) {
      console.log("niepoprawny numer");
      actualError.push("niepoprawny numer");
    }

    if (actualError.length === 0) {
      // moge wyslac formularz
      console.log(name, email, phone);
      this.setState({
        errors: [],
        imBusy: true
      });

      setTimeout(() => {
        this.setState({
          imBusy: false,
          imSucces: true,
          name: "",
          email: "",
          phone: ""
        });
      }, 3000);
    } else {
      this.setState({
        errors: actualError
      });
      // wyswietlic error
    }
  }

  render() {
    const { name, email, phone, errors, imBusy, imSucces } = this.state;
    return (
      <div>
        <div className="wrapper">
          <form className="form" method="GET" action="/register">
            <div className="form-group">
              <input
                name="name"
                type="text"
                value={name}
                className="form-control"
                placeholder={"Wpisz imię"}
                required={true}
                onChange={this.setInputValue}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                value={email}
                className="form-control"
                placeholder={"Wpisz email"}
                required={true}
                onChange={this.setInputValue}
              />
            </div>
            <div className="form-group">
              <input
                name="phone"
                type="text"
                value={phone}
                className="form-control"
                placeholder={"Wpisz numer"}
                required={true}
                onChange={this.setInputValue}
              />
            </div>

            {errors.length !== 0 && <ErrorsList errors={errors} />}

            {imBusy ? (
              <small>Loading....</small>
            ) : (
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control submit-button"
                  value="Wyślij"
                  onClick={this.onSubmit}
                />
              </div>
            )}

            {imSucces && <SuccesMsg />}
          </form>
        </div>
        {/* {JSON.stringify(this.state)} */}
      </div>
    );
  }
}

export default RegistrationForm;
