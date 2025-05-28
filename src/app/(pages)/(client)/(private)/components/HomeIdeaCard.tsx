'use client';

import Image from 'next/image';
import { FaTag } from 'react-icons/fa';
import { IdeaType } from '@/types/IdeaTypes';
import clsx from 'clsx';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';

type Props = {
  idea: IdeaType;
  className?: string;
};

function HomeIdeaCard({ idea, className }: Props) {
  return (
    <Link
      href={{
        pathname: linkTo.user.ideas.detail.replace('[ideaCode]', idea.id),
        query: { from: 'home' },
      }}
    >
      <div className={clsx('relative h-48 w-full rounded-lg overflow-hidden shadow', className)}>
        <Image
          src={idea.imageUrls || '/logo.png'}
          alt={idea.title}
          fill
          priority={false}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-gray-900/10 to-gray-900/70" />
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
          <h3 className="font-bold text-xl leading-tight line-clamp-2 ">{idea.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <FaTag className="shrink-0" />
            <span className="truncate">{idea.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeIdeaCard;
