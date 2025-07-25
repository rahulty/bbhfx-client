import { ArticleProps, ContentListProps } from "@/types";
import { getContent } from "@/data/loaders";

import { PaginationComponent } from "./PaginationComponent";
import { Search } from "@/components/Search";

// prettier-ignore
async function loader(
  path: string,featured?: boolean,query?: string,page?: string
) {
  const { data, meta } = await getContent(path, featured, query, page);
  return {
    articles: (data as ArticleProps[]) || [],
    pageCount: meta?.pagination?.pageCount || 1,
  };
}

export async function ContentList(props: Readonly<ContentListProps>) {
  // prettier-ignore
  const { headline, path, featured, component: Component, headlineAlignment = "left",
    showSearch, query, page, showPagination, comp
  } = props;
  const { articles, pageCount } = await loader(path, featured, query, page);

  return (
    <section className="content-items container">
      <h3
        className={`content-items__headline ${`content-items--${headlineAlignment}`}`}
      >
        {headline || "Featured Articles"}
      </h3>
      {showSearch && <Search />}
      <div className="content-items__container--card">
        {articles.map((article) => (
          <Component
            key={article.documentId}
            {...article}
            // @ts-ignore
            comp={comp}
            basePath={path}
          />
        ))}
      </div>
      {showPagination && <PaginationComponent pageCount={pageCount} />}
    </section>
  );
}
