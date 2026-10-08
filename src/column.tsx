
import { useState } from 'react'
import type { DragEvent } from 'react'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Card } from './card'
import type { ColumnData } from './types'

type ColumnProps = {
  column: ColumnData
  onMoveCard: (cardId: string, columnId: string) => void
}

export function Column({ column, onMoveCard }: ColumnProps) {
  const [isOver, setIsOver] = useState(false)

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setIsOver(true)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsOver(false)

    const cardId = event.dataTransfer.getData('text/plain')
    if (cardId) {
      onMoveCard(cardId, column.id)
    }
  }

  return (
    <Box
      bg={isOver ? 'blue.100' : 'gray.100'}
      borderWidth="2px"
      borderColor={isOver ? 'blue.400' : 'transparent'}
      borderRadius="lg"
      p={4}
      minWidth={0}
      minHeight="250px"
      onDragOver={handleDragOver}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsOver(false)
        }
      }}
      onDrop={handleDrop}
      transition="background 0.2s"
    >
      <Heading size="md" mb={4}>
        {column.title}
      </Heading>

      <Stack gap={3}>
        {column.cards.length === 0 ? (
          <Text color="gray.500">No cards yet</Text>
        ) : (
          column.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))
        )}
      </Stack>
    </Box>
  )
}
