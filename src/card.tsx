
import type { DragEvent } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import type { CardData } from './types'

type CardProps = {
  card: CardData
}

export function Card({ card }: CardProps) {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('text/plain', card.id)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Box
      draggable
      onDragStart={handleDragStart}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={3}
      shadow="sm"
      cursor="grab"
      _hover={{ shadow: 'md' }}
      _active={{ cursor: 'grabbing' }}
    >
      <Heading size="sm">{card.title}</Heading>

      {card.description && (
        <Text mt={2} color="gray.600" fontSize="sm">
          {card.description}
        </Text>
      )}
    </Box>
  )
}
