import logmatic from 'logmatic-js'

logmatic.init('-tV74gimSsiXsxEac3Q7qQ')
logmatic.setMetas({'appname': 'manabu', 'userId': 'romain'})
logmatic.setSendConsoleLogs('severity')
logmatic.setSendErrors('error')
logmatic.setSendConsoleLogs('severity')
logmatic.setIPTracking('client.IP')
logmatic.setUserAgentTracking('client.user-agent')
logmatic.setURLTracking('url')
logmatic.setBulkOptions({ lingerMs: 500, maxPostCount: 10, maxWaitingCount: -1 })

export default logmatic
