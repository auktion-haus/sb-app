import { useEffect, useState } from "react";
import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { APP_NAME, DEFAULT_CHAIN_ID, YEET24_REFERRER } from "../utils/constants";
import {
  BigH1,
  SimpleCol,
  SimpleRow,
  Spacer,
} from "../components/Layout/Layout";

// import { YeetMarquee } from "../components/YeetMarquee";

import { useRagequits } from "../hooks/useRagequits";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";
import { DaoProfile, listDaos, ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { handleErrorMessage } from "@daohaus/utils";
import { filter } from "@mdxeditor/editor";
import { set } from "date-fns";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;

const StyledDialogContent = styled(DialogContent)`
  z-index: 10;
`;

const DaoCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 1rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;
const DaoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const DaoActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const HausAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`;

const Landing = () => {
  const [daoData, setDaoData] = useState<(ListDaosQueryResDaos)>([]);
  const [daoProfileData, setDaoProfileData] = useState<(DaoProfile[])>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const { address, chainId } = useDHConnect();

  const { ragequits } = useRagequits({
    chainId: DEFAULT_CHAIN_ID,
  });


  useEffect(() => {
    let shouldUpdate = true;

    const getDaos = async (chainId: ValidNetwork) => {
      setLoading(true);
      try {
        const query = await listDaos({
          networkId: chainId,
          filter: {
            // name_contains_nocase: debouncedSearchTerm,
            referrer: YEET24_REFERRER,
          },
          // ordering: SORT_FIELDS[sortBy].ordering,
          graphApiKeys: {
            "0x1": process.env["NX_GRAPH_API_KEY_MAINNET"],
            "0x64": process.env["NX_GRAPH_API_KEY_MAINNET"],
            "0xaa36a7": process.env["NX_GRAPH_API_KEY_MAINNET"],
            "0xa": process.env["NX_GRAPH_API_KEY_MAINNET"],

          },
        });
        if (query.items && shouldUpdate) {

          // filter for tag name here
          // TODO: can this be updated in the query?
          const filteredDaos = query.items
            .filter((dao) => {
              return dao.tags?.includes(APP_NAME);
            }).map((dao) => {
              if (dao.profile) {
                const parsedProfile = JSON.parse(dao.profile[0].content);
                setDaoProfileData([...daoProfileData, parsedProfile]);
              }
              return dao;
            });

          console.log("filteredDaos", filteredDaos);

          setDaoData(filteredDaos);
          setLoading(false);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: "Error loading DAOs",
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    // if (!chainId) return;
    getDaos(chainId || DEFAULT_CHAIN_ID);
    return () => {
      shouldUpdate = false;
    };
  }, [chainId]);

  console.log("daoData", daoData);
  console.log("daoProfileData", daoProfileData);



  return (
    <>
      <WideColumnLayout
        subtitle={"DECENTRALIZED COLLECTIVE NOUNS AUCTIONS".toUpperCase()}
      >
        <div>
          <BigH1>{APP_NAME}</BigH1>
          <Spacer />
          <SimpleRow>
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  WHAT IS THIS?
                </Button>
              </DialogTrigger>
              <StyledDialogContent
                title=" Welcome to fully dilluted, unruggable, fair launch
                    tokens"
              >
                <SimpleCol>
                  <ParMd>
                    * Create your token to kick off the 48-hour presale
                  </ParMd>
                  <ParMd>
                    * If the threshold is met, the presale will close, and a
                    Uniswap v3 liquidity pool will be initiated with the all ETH
                    raised in the presale. Your token will become available for
                    purchase on the marketplace.
                  </ParMd>
                  <ParMd>
                    * If the threshold is not met, the presale will close, and
                    contributors will be able to withdraw their contributions.
                  </ParMd>
                </SimpleCol>
              </StyledDialogContent>
            </Dialog> */}

            <LinkButton to="/about">
              <Button variant="outline" size="lg">
                WHAT IS THIS?
              </Button>
            </LinkButton>

          </SimpleRow>

          <Spacer />

          {/* {yeets && allYeeters && (
            <YeetMarquee
              yeets={yeets}
              yeeters={allYeeters.slice(0, 5)}
              ragequits={ragequits}
              chainId={DEFAULT_CHAIN_ID}
            />
          )} */}

          {daoData && (
            <SimpleCol>
              <H1>Blocks</H1>
              {loading && <ParMd>Loading...</ParMd>}
              {daoData.map((dao, idx) => (
                <DaoCard key={dao.id}>
                  <DaoInfo>
                    {daoProfileData[idx].avatarImg && <HausAvatar src={daoProfileData[idx].avatarImg} />}
                    <ParMd>{dao.name}</ParMd>
                    <ParMd>{daoProfileData[idx].description}</ParMd>
                    <ParMd>Members: {dao.activeMemberCount}</ParMd>
                  </DaoInfo>
                  <DaoActions>
                    <LinkButton to={`/molochv3/${chainId}/${dao.id}/${dao.shamen?.find(shaman => shaman.permissions == "2")?.shamanAddress}/join`}>
                      <Button variant="outline" size="md">
                        YEET TO JOIN
                      </Button>
                    </LinkButton>

                    <LinkButton to={`/molochv3/${chainId}/${dao.id}/${dao.shamen?.find(shaman => shaman.permissions == "2")?.shamanAddress}`}>
                      <Button variant="outline" size="md">
                        DASHBOARD
                      </Button>
                    </LinkButton>
                  </DaoActions>
                </DaoCard>
              ))}
            </SimpleCol>
          )}

          <Spacer />
          <Spacer />
          <Spacer />



          {/* <H6>My Yeeters</H6>

              {myYeeters && <YeeterList yeeters={myYeeters} />} */}
        </div>
      </WideColumnLayout>
    </>
  );
};

export default Landing;
