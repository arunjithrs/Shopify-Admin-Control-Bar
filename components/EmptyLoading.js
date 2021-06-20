import {
  Layout,
  Card,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";

const EmptyLoading = () => {
  return (
    <Layout>
      <Layout.Section secondary>
        <Card>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </TextContainer>
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

export default EmptyLoading;
