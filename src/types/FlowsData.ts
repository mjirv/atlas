// // Range type courtesy nightlyherb at https://github.com/microsoft/TypeScript/issues/15480#issuecomment-1245429783
// type ArrayOfLength<
//   N extends number,
//   A extends any[] = [],
// > = A['length'] extends N ? A : ArrayOfLength<N, [...A, any]>
// type Inc<N extends number> = number & [...ArrayOfLength<N>, any]['length']

// type Range<Start extends number, End extends number> = number &
//   (Start extends End ? never : Start | Range<Inc<Start>, End>)

// type EventIndices<Steps extends number> = {
//   [Property in keyof Range<0, Steps> as `event_${number & Property}`]:
//     | string
//     | null
// }

// export type FlowsData<Steps extends number> = (EventIndices<Steps> & {
//   n_events: number
// })[]

export type FlowsData = (Record<string, string | null> & { n_events: number })[]
