
import { useState } from 'react'
import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { Column } from './column'
import type { BoardData } from './types'

type BoardProps = {
  board: BoardData
}

export function Board({ board }: BoardProps) {
  const [boardData, setBoardData] = useState<BoardData>(board)

  function moveCard(cardId: string, targetColumnId: string) {
    setBoardData((current) => {
      const sourceColumn = current.columns.find((column) =>
        column.cards.some((card) => card.id === cardId)
      )

      if (!sourceColumn || sourceColumn.id === targetColumnId) {
        return current
      }

      const card = sourceColumn.cards.find((card) => card.id === cardId)
      if (!card) return current

      return {
        ...current,
        columns: current.columns.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              cards: column.cards.filter((c) => c.id !== cardId),
            }
          }

          if (column.id === targetColumnId) {
            return {
              ...column,
              cards: [...column.cards, card],
            }
          }

          return column
        }),
      }
    })
  }

  return (
    <Stack gap={6} width="100%">
      <Heading size="2xl">{boardData.title}</Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 4 }}
        gap={4}
        width="100%"
      >
        {boardData.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onMoveCard={moveCard}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
