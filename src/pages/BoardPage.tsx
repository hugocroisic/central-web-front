import { Stack } from '@chakra-ui/react'
import { Board } from '../board'
import board from '../../data/board.json'

export function BoardPage() {
  return (
    <Stack gap={4} width="100%">
      <Board board={board} />
    </Stack>
  )
}
