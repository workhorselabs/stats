import { Badge } from "~/components/ui/badge";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
];

const Faq = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center">
          <Badge className="text-xs font-medium">FAQ</Badge>
          <h1 className="mt-4 text-4xl font-semibold">
            Common Questions & Answers
          </h1>
          <p className="mt-6 font-medium text-muted-foreground">
            Find out all the essential details about our platform and how it can
            serve your needs.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-screen-sm">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq };

// Simple FAQ
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "~/components/ui/accordion";

// interface FaqItem {
//   question: string;
//   answer: string;
// }

// interface FaqProps {
//   heading?: string;
//   items?: FaqItem[];
// }

// const Faq = ({
//   heading = "Frequently asked questions",
//   items = [
//     {
//       question: "What is a FAQ?",
//       answer:
//         "A FAQ is a list of frequently asked questions and answers on a particular topic.",
//     },
//     {
//       question: "What is the purpose of a FAQ?",
//       answer:
//         "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
//     },
//     {
//       question: "How do I create a FAQ?",
//       answer:
//         "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
//     },
//     {
//       question: "What are the benefits of a FAQ?",
//       answer:
//         "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
//     },
//   ],
// }: FaqProps) => {
//   return (
//     <section className="py-32">
//       <div className="container max-w-3xl">
//         <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
//           {heading}
//         </h1>
//         <Accordion type="single" collapsible>
//           {items.map((item, index) => (
//             <AccordionItem key={index} value={`item-${index}`}>
//               <AccordionTrigger className="font-semibold hover:no-underline">
//                 {item.question}
//               </AccordionTrigger>
//               <AccordionContent className="text-muted-foreground">
//                 {item.answer}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// };

// export { Faq };
