import { Flex, Button, Link, Tooltip } from '@chakra-ui/react'

type Props = {
  selected?: string
}

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

const MenuNav = ({ selected }: Props) => {
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
      <MenuButton
        href="/reports/funnel"
        variant={selected === `funnel` ? `solid` : `outline`}
      >
        Funnel
      </MenuButton>
      <MenuButton
        href="/reports/flows"
        variant={selected === `flows` ? `solid` : `outline`}
      >
        Flows
      </MenuButton>
      <MenuButton
        href="/reports/retention"
        variant={selected === `retention` ? `solid` : `outline`}
      >
        Retention
      </MenuButton>
      <Tooltip
        label="Coming soon!"
        aria-label="Coming soon"
        shouldWrapChildren={true}
      >
        <MenuButton disabled={true}>SQL Runner</MenuButton>
      </Tooltip>
    </Flex>
  )
}

export default MenuNav
