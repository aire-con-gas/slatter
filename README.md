# slatter
A simple NodeJS passthrough server for Slack outbound messages to Chatter(Salesforce) integration.

By taking advantage of Slack’s outgoing webhooks, you pass the payload to Slatter which will then verify and pass the message to Chatter.

# Dependencies
Thanks to these other awesome libraries for making Slatter possible:
* https://github.com/jeffdonthemic/nforce-chatter
* https://github.com/kevinohara80/nforce

# Slack Configuration
Go to your Integrations settings in Slack and view "Outgoing WebHooks". Then click on "Add Outgoing WebHooks Integration". Set the URL to wherever you have slatter setup and utilize the token from the payload to verify the message in slatter.

# Development and Debugging
This provides fast and simple tunneling to get access to a local slatter instance:
https://github.com/localtunnel/localtunnel
