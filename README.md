---
- Vote API Lara

  - Get All Candidate

    - **Request:**
      - Method: GET
      - URL: [http://127.0.0.1:8000/api/index](http://127.0.0.1:8000/api/index)
      - Headers:
        - OTP: 7926

    - **Response:** (No specific details provided)

  - Register

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/register](http://127.0.0.1:8000/api/register)
      - Body:
        ```json
        {
            "nis": "0199",
            "email": "joko@gmail.com"
        }
        ```

    - **Response:** (No specific details provided)

  - OTP Verify

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/otp/verify](http://127.0.0.1:8000/api/otp/verify)
      - Headers:
        - OTP: 4175
      - Body:
        ```json
        {
            "otp": "4175"
        }
        ```

    - **Response:** (No specific details provided)

  - Resend OTP

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/resend-otp](http://127.0.0.1:8000/api/resend-otp)
      - Headers:
        - OTP: 3229 (Disabled)
      - Body:
        ```json
        {
            "nis": "20199"
        }
        ```

    - **Response:** (No specific details provided)

  - Login

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/login](http://127.0.0.1:8000/api/login)
      - Body:
        ```json
        {
            "otp": "8352",
            "email": "andi@gmail.com"
        }
        ```

    - **Response:** (No specific details provided)

  - Logout

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/logout](http://127.0.0.1:8000/api/logout)
      - Headers:
        - OTP: 8352
      - Body:
        ```json
        {
            "otp": "8352"
        }
        ```

    - **Response:** (No specific details provided)

  - Vote

    - **Request:**
      - Method: POST
      - URL: [http://127.0.0.1:8000/api/vote/8352/20189](http://127.0.0.1:8000/api/vote/8352/20189)
      - Headers:
        - OTP: 8352

    - **Response:** (No specific details provided)
