import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Post } from "@/types/post";
import { PostItem } from "./components/PostItem";

const postList: Post[] = [
  {
    title: "포스트1",
    description:
      "Fugiat laboris eu tempor est duis cupidatat incididunt veniam adipisicing non labore minim dolor. Esse culpa sit mollit commodo eiusmod fugiat adipisicing nostrud eu. Nulla laboris consequat eiusmod et duis dolor tempor magna. In eiusmod deserunt laboris commodo irure pariatur non id eiusmod labore aliquip ea amet commodo. Anim excepteur et amet non est cupidatat excepteur laboris labore et reprehenderit. Sit officia aliquip magna ullamco officia eiusmod aute commodo dolore. Laboris et irure quis irure. Commodo consectetur magna esse minim labore. Fugiat irure est elit velit aliqua nostrud. Velit deserunt nulla anim sint. Exercitation nulla veniam aute cupidatat anim adipisicing sint nostrud aliquip adipisicing anim aliqua eiusmod.",
    created: "2025-01-01",
  },
  {
    title: "포스트2",
    description:
      "Fugiat laboris eu tempor est duis cupidatat incididunt veniam adipisicing non labore minim dolor. Esse culpa sit mollit commodo eiusmod fugiat adipisicing nostrud eu. Nulla laboris consequat eiusmod et duis dolor tempor magna. In eiusmod deserunt laboris commodo irure pariatur non id eiusmod labore aliquip ea amet commodo. Anim excepteur et amet non est cupidatat excepteur laboris labore et reprehenderit. Sit officia aliquip magna ullamco officia eiusmod aute commodo dolore. Laboris et irure quis irure. Commodo consectetur magna esse minim labore. Fugiat irure est elit velit aliqua nostrud. Velit deserunt nulla anim sint. Exercitation nulla veniam aute cupidatat anim adipisicing sint nostrud aliquip adipisicing anim aliqua eiusmod.",
    created: "2025-01-02",
  },
  {
    title: "포스트3",
    description:
      "Fugiat laboris eu tempor est duis cupidatat incididunt veniam adipisicing non labore minim dolor. Esse culpa sit mollit commodo eiusmod fugiat adipisicing nostrud eu. Nulla laboris consequat eiusmod et duis dolor tempor magna. In eiusmod deserunt laboris commodo irure pariatur non id eiusmod labore aliquip ea amet commodo. Anim excepteur et amet non est cupidatat excepteur laboris labore et reprehenderit. Sit officia aliquip magna ullamco officia eiusmod aute commodo dolore. Laboris et irure quis irure. Commodo consectetur magna esse minim labore. Fugiat irure est elit velit aliqua nostrud. Velit deserunt nulla anim sint. Exercitation nulla veniam aute cupidatat anim adipisicing sint nostrud aliquip adipisicing anim aliqua eiusmod.",
    created: "2025-01-03",
  },
  {
    title: "포스트4",
    description:
      "Fugiat laboris eu tempor est duis cupidatat incididunt veniam adipisicing non labore minim dolor. Esse culpa sit mollit commodo eiusmod fugiat adipisicing nostrud eu. Nulla laboris consequat eiusmod et duis dolor tempor magna. In eiusmod deserunt laboris commodo irure pariatur non id eiusmod labore aliquip ea amet commodo. Anim excepteur et amet non est cupidatat excepteur laboris labore et reprehenderit. Sit officia aliquip magna ullamco officia eiusmod aute commodo dolore. Laboris et irure quis irure. Commodo consectetur magna esse minim labore. Fugiat irure est elit velit aliqua nostrud. Velit deserunt nulla anim sint. Exercitation nulla veniam aute cupidatat anim adipisicing sint nostrud aliquip adipisicing anim aliqua eiusmod.",
    created: "2025-01-04",
  },
  {
    title: "포스트5",
    description:
      "Fugiat laboris eu tempor est duis cupidatat incididunt veniam adipisicing non labore minim dolor. Esse culpa sit mollit commodo eiusmod fugiat adipisicing nostrud eu. Nulla laboris consequat eiusmod et duis dolor tempor magna. In eiusmod deserunt laboris commodo irure pariatur non id eiusmod labore aliquip ea amet commodo. Anim excepteur et amet non est cupidatat excepteur laboris labore et reprehenderit. Sit officia aliquip magna ullamco officia eiusmod aute commodo dolore. Laboris et irure quis irure. Commodo consectetur magna esse minim labore. Fugiat irure est elit velit aliqua nostrud. Velit deserunt nulla anim sint. Exercitation nulla veniam aute cupidatat anim adipisicing sint nostrud aliquip adipisicing anim aliqua eiusmod.",
    created: "2025-01-05",
  },
];

export default function Page() {
  return (
    <Box maxWidth="690px" marginX="auto" paddingX="16px" paddingY="70px">
      <Flex direction="column" gap={24}>
        {postList.map((post, i) => (
          <PostItem key={i} {...post} />
        ))}
      </Flex>
    </Box>
  );
}
