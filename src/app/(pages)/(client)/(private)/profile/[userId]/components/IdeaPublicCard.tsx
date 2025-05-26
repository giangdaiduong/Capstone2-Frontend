import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';

function IdeaPublicCard({ idea }: { idea: IdeaType }) {
  return (
    <Card className="w-3/4 min-w-[300px]">
      <CardHeader>
        <CardTitle>{idea.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default IdeaPublicCard;
