```typescript
// src/components/TesteEVUP.tsx
import React from "react";

const TesteEVUP: React.FC = () => {
  return (
    <div>
      <h2>IA Testasda</h2>
      {/* Conteúdo do TesteEVUP */}
    </div>
  );
};

export default TesteEVUP;

// src/components/EVUPPRODUTO.tsx
import React from "react";
import Layout from "./Layout";
import TesteEVUP from "./TesteEVUP";

const EVUPPRODUTO: React.FC = () => {
  return (
    <Layout>
      <TesteEVUP />
    </Layout>
  );
};

export default EVUPPRODUTO;
```