
# NodeJs-Express_Projects
This repository contains a collection of Node.js projects built using the Express framework. Each project showcases various features and functionalities that can be implemented using Node.js and Express.

# User profile generation and authentication

This Node.js and Express project provides a robust user profile generation and authentication system. It enables users to sign up, log in, log out, reset passwords, update their profile information, and retrieve details of the logged-in user. The project leverages the power of Cloudinary to handle image uploads and utilizes Nodemailer in combination with Mailtrap for sending emails to users.



## Project Overview

The project aims to provide a secure and user-friendly authentication system for web applications. It incorporates various essential features to facilitate a seamless user experience. Here's an overview of the key functionalities:

-   **Sign Up**: Users can create a new account by providing their email address, username, and password. The system ensures the uniqueness of the email address and validates the password strength.
    
-   **Login**: Authenticated users can log in to their accounts using their credentials. The system verifies the user's identity and grants access to protected routes.
    
-   **Logout**: Logged-in users can choose to log out, terminating their current session and invalidating their access token.
    
-   **Forgot Password**: Users who forget their password can initiate the password reset process. They receive an email with a reset link to create a new password securely.
    
-   **Password Reset**: Users can reset their password by clicking the reset link received via email. The system verifies the link's validity and allows them to set a new password.
    
-   **Get Logged-in User's Details**: Authenticated users can retrieve their profile details, including their username, email address, and profile picture.
    
-   **Update Password**: Users can update their password by providing their current password and a new password. The system verifies the current password's correctness before allowing the password update.
    
-   **Update Profile**: Authenticated users have the ability to update their profile information, such as their username, email address, and profile picture. The project integrates with Cloudinary to handle image uploads efficiently.
    

The project uses Node.js and Express for server-side development, ensuring scalability and flexibility. Cloudinary is employed to handle image uploads, enabling users to set or update their profile picture. Nodemailer, in conjunction with Mailtrap, is utilized to send emails securely for features like password reset notifications.

## Installation
git clone <repository_url>
cd <project_directory>
npm install

Configure the environment variables:
- Update the necessary values in the `.env` file, such as the database connection URL, Cloudinary credentials, and email service details.



## Routes

- `POST /signup`: Create a new user account.
- `POST /login`: Authenticate and login the user.
- `POST /logout`: Log out the currently logged-in user.
- `POST /forgotPassword`: Initiate the password reset process.
- `POST /passwordReset`: Reset the user's password.
- `GET /getLoggedInUsersDetails`: Retrieve details of the logged-in user.
- `POST /updatePassword`: Update the user's password.
- `POST /updateProfile`: Update the user's profile details.

Provide more details about each route, including the expected request parameters and the corresponding response format.

## Dependencies

Refer package.json file for dependencies

- Node.js version: `<node_version>`
- Express version: `<express_version>`
- Cloudinary version: `<cloudinary_version>`
- Nodemailer version: `<nodemailer_version>`
- Mailtrap version: `<mailtrap_version>`

## Contributing

Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue. Please follow the contribution guidelines outlined.


