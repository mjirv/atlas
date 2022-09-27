import { Flex, Button, Link } from '@chakra-ui/react'

const MenuButton = ({ ...params }) => {
  return (
    <Button
      variant="outline"
      colorScheme="messenger"
      flex={1}
      as={Link}
      {...params}
    />
  )
}

const MenuNav = () => {
  return (
    <Flex
      gap={`6px`}
      padding="10px"
      borderStyle={`solid`}
      borderWidth="0 0 1px 0"
    >
      <MenuButton href="/" variant="link" flex={2} fontSize="2rem">
        Atlas
      </MenuButton>
      <MenuButton href="/reports/funnel">Funnel</MenuButton>
      <MenuButton href="/reports/flows">Flows</MenuButton>
      <MenuButton href="/reports/retention">Retention</MenuButton>
      <MenuButton href="/reports/sql">SQL Runner</MenuButton>
    </Flex>
  )
}

export default MenuNav
