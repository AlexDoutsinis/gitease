import { allChangesAreStagedOrStashed } from './allChangesAreStagedOrStashed.js'
import { popStashedChanges } from './popStashedChanges.js'
import { stashCurrentChanges } from './stashCurrentChanges.js'

export async function stashDoThenPop(shell, callback) {
  const stashChanges = !allChangesAreStagedOrStashed(shell)

  if (stashChanges) {
    stashCurrentChanges(shell)
  }

  await callback()

  if (stashChanges) {
    popStashedChanges(shell)
  }
}
