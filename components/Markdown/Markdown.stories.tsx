import type { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "./Markdown";

const meta: Meta<typeof Markdown> = {
  component: Markdown,
};
export default meta;

export const Primary: StoryObj<typeof Markdown> = {
  args: {
    source: `
    # Example Markdown

    ## Headers

    # This is a H1
    ## This is a H2
    ### This is a H3
    
    ---
    ## Paragraph

    Ad ad elit fugiat pariatur do ut ut ea culpa. Quis irure et dolore commodo non amet ad veniam eu nulla. Non sint id consequat ex sit consequat. Aliqua ipsum labore sit officia id minim officia exercitation nulla enim. Id non et anim exercitation qui reprehenderit fugiat sunt duis magna deserunt nisi. Qui laborum anim in id culpa officia excepteur. Aute esse amet quis pariatur duis nostrud amet occaecat ipsum proident commodo esse do.

    Nisi reprehenderit proident irure ullamco. Pariatur proident mollit enim cillum occaecat nostrud aliquip dolore nisi minim aliquip reprehenderit commodo. Et eiusmod irure et mollit eu quis in officia ut sit ad. Laborum proident qui nisi eu commodo irure nostrud veniam nulla adipisicing ut.

    ---
    
    ## BlockQuote
    
    > BlockQuote
    >
    > Deserunt ad fugiat irure veniam qui minim labore aliqua eiusmod eu amet ex quis commodo. Esse elit deserunt officia do. Amet do ex aliquip veniam occaecat enim et consequat reprehenderit in consectetur qui. Eu aute dolor ea est eu ipsum cillum laborum sit. Sint eu officia elit esse.
    > - list item1
    > - list item2

    ---
    
    ## List
    
    1. First item
    2. Second item
    3. Third item
        - Indented item
        - Indented item
    4. Fourth item
    
    ---
    
    ## Code
    
    \`\`\`jsx
    function App() {
      return (
        <div>markdown example</div>
      );
    }
    \`\`\`
    
    ---
    
    ## Hr
    
    ---
    
    ## Links
    
    [Google](https://google.com)
    
    [[outlinks]]
    
    ---
    
    ## Emphasis

    - Bold
      - **double asterisks**
      - **double underscores**
    - Italic
      - _single asterisks_
      - _single underscores_
  
    ---
    
    ## Image
    
    ![이미지](image)

    <img
    src="url"
    width="500px"
    height="300px"
    />

    ![[image.png]]

    ---

    ## Table

    | Col1 | Col2 |
    | - | - |
    | A | 1 |
    | B | 2 |
    | C | 3 |

    `,
  },
};
