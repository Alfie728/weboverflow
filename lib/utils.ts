import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  return "Just now";
};

export const formatAndDivideNumber = (num?: number): string => {
  if (typeof num !== "number" || isNaN(num)) {
    return "0";
  }

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleDateString("default", { month: "long" });
  const year = date.getFullYear();

  return `Joined ${month} ${year}`;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};

export const convertMarkdownToHTML = (markdown: string) => {
  // Function to escape HTML
  const escapeHTML = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Split the markdown into code blocks and non-code parts
  const parts = markdown.split(/(```[\s\S]*?```)/);

  const html = parts
    .map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        // Handle code blocks
        const [, lang, code] = part.match(/```(\w+)?\n([\s\S]*?)```/) || [];
        return `<pre><code class="language-${lang || "plaintext"}">${escapeHTML(
          code?.trim() ?? ""
        )}</code></pre>`;
      } else {
        // Handle non-code parts
        let processed = part;

        // Replace inline code
        processed = processed.replace(
          /`([^`]+)`/g,
          (_, code) => `<code>${escapeHTML(code)}</code>`
        );

        // Replace headings
        processed = processed.replace(
          /^(#{1,6})\s(.*)$/gm,
          (_, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content.trim()}</h${level}>`;
          }
        );

        // Replace bold text
        processed = processed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // Replace italic text
        processed = processed.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // Replace highlight text
        processed = processed.replace(/==(.*?)==/g, "<mark>$1</mark>");

        // Replace line breaks
        processed = processed.replace(/\n/g, "<br>");

        // Wrap content in paragraphs if not already wrapped
        if (!/^<[^>]+>/.test(processed)) {
          processed = `<p>${processed}</p>`;
        }

        return processed;
      }
    })
    .join("");

  return html;
};

export function stripHtml(html: string): string {
  // Function to preserve code blocks
  const preserveCodeBlocks = (text: string) => {
    const codeBlocks: string[] = [];
    const preservedText = text.replace(
      /<pre><code[\s\S]*?<\/code><\/pre>/g,
      (match) => {
        codeBlocks.push(match);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
      }
    );
    return { preservedText, codeBlocks };
  };

  // Preserve code blocks
  const { preservedText, codeBlocks } = preserveCodeBlocks(html);

  // Strip HTML tags
  let stripped = preservedText.replace(/<[^>]*>/g, "");

  // Decode HTML entities
  stripped = stripped
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  // Restore code blocks
  stripped = stripped.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    const codeBlock = codeBlocks[parseInt(index)];
    // Extract the code content from the code block
    const codeContent = codeBlock.match(/<code[^>]*>([\s\S]*?)<\/code>/)?.[1] || "";
    // Decode HTML entities in the code content
    const decodedContent = decodeHTMLEntities(codeContent);
    return `\nCode:\n${decodedContent}\n`;
  });

  // Remove extra whitespace
  stripped = stripped.replace(/\s+/g, " ").trim();

  return stripped;
}

// Helper function to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#32;': ' ',
    '&nbsp;': ' '
  };
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

export function range(
  start: number,
  stop?: number,
  step: number = 1
): number[] {
  // If only one argument is provided, set start to 0 and stop to the provided value
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  // Create an array to hold the range values
  const result: number[] = [];

  // Handle positive and negative steps
  if (step > 0) {
    // Generate values for positive step
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    // Generate values for negative step
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}
