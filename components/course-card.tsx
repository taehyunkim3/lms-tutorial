interface CourseCardProps {
  id: string;
  title: string;
  imgUrl: string;
  chapterLength: number;
  price: number;
  progress: number;
  category: string;
}

const CourseCard = ({
  id,
  title,
  imgUrl,
  chapterLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return <div className="">coursecard</div>;
};

export default CourseCard;
