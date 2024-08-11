type TagsProps = {
    tags: string[];
}

const Tags = ({tags}: TagsProps) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <span key={tag} className="mr-2 text-secondary">
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
