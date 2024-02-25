import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'

type TagRecordsProps = {
  activeTag?: string
  allCount?: number
}

export default function TagRecords({ activeTag, allCount }: TagRecordsProps) {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  // Use replaceAll to capitalize the first letter of each word
  return (
    <div className="mb-8 mt-4 flex flex-wrap gap-y-2">
      {tagKeys.length === 0 && 'No tags found.'}
      <Tag text={allCount ? `All (${allCount})` : 'All'} active={!activeTag} href="/projects" />
      {sortedTags.map((t) => (
        <Tag
          key={t}
          text={`${t} (${tagCounts[t]})`}
          active={t.toLowerCase() === activeTag}
          href={`/tags/${t.toLowerCase()}`}
        />
      ))}
    </div>
  )
}
