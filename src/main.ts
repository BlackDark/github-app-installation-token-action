import {setFailed, setOutput, getInput, info} from '@actions/core'
import {getToken} from '@blackdark/github-app-installation-token'

export async function run(): Promise<void> {
  try {
    const appId = parseInt(getInput('appId'), 10)
    const installationId = parseInt(getInput('installationId'), 10)
    const privateKey = getInput('privateKey')
    const baseUrl = getInput('baseUrl', {required: false})

    const date = new Date()
    info(`Machine timestamp: ${date.toISOString()} - ${date.toLocaleString()}`)
    const {token} = await getToken({appId, installationId, privateKey, baseUrl})

    setOutput('token', token)
  } catch (error) {
    setFailed(error.message)
  }
}
