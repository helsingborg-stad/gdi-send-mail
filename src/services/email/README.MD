# Default mail send provider

The default mail send provider is just provided as an example.
It doesnt need any environment parameters as it is just writing to screen

## Helsingborgs stad mail send provider

The Helsingborgs stad mail content provider is sending the mail through a
proxy API.

To enable it, our environment should contain:

```sh
EMAIL_PROVIDER=helsingborg
EMAIL_PROXY_URL=<The fully qualified URL of the email proxy service>
EMAIL_PROXY_KEY=<The API key to use for the email proxy service>
EMAIL_SENDER_ADRESS=<The sending email address>
EMAIL_SENDER_NAME=<The readable name of the sender>
```
