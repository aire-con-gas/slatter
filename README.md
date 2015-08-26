# slatter
A simple NodeJS passthrough server for Slack to Chatter(Salesforce) integration.

By taking advantage of Slack’s outgoing webhooks, you pass the payload to Slatter which will then verify and pass the message to Chatter.

# Dependencies

Thanks to these other awesome libraries for making Slatter possible:
* https://github.com/jeffdonthemic/nforce-chatter
* https://github.com/kevinohara80/nforce

# Development and Debugging
This provides fast and simple tunneling to get access to a local slatter instance:
https://github.com/localtunnel/localtunnel
