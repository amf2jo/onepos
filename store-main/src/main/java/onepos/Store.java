package onepos;


import javax.persistence.*;

@Entity
@Table(name="store_store") //매장등록(회원가입)
public class Store {

    @Id @GeneratedValue
    int storeId; //매장ID
    String storeName; //매장명
    String repName; //대표자명
    String repPhonNum; //대표자연락처
    String passWd ; //패스워드
    int tableCnt ; // 매장 테이블 수


    public String getRepPhonNum() {
        return repPhonNum;
    }

    public void setRepPhonNum(String repPhonNum) {
        this.repPhonNum = repPhonNum;
    }

    public String getRepName() {
        return repName;
    }

    public void setRepName(String repName) {
        this.repName = repName;
    }


    public int getTableCnt() {
        return tableCnt;
    }

    public void setTableCnt(int tableCnt) {
        this.tableCnt = tableCnt;
    }

    public String getPassWd() {
        return passWd;
    }

    public void setPassWd(String passWd) {
        this.passWd = passWd;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }






}
