package com.vtth.foodapi.entity;
// Generated May 20, 2016 1:47:30 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * TblCategory generated by hbm2java
 */
@Entity
@Table(name = "tbl_category", catalog = "fooddb")
public class TblCategory implements java.io.Serializable {

    private Integer categoryId;
    private String categoryName;
    private Set<TblFood> tblFoods = new HashSet<TblFood>(0);
    private Set<TblFood> tblFoods_1 = new HashSet<TblFood>(0);

    public TblCategory() {
    }

    public TblCategory(String categoryName) {
        this.categoryName = categoryName;
    }
    public TblCategory(String categoryName, Set<TblFood> tblFoods, Set<TblFood> tblFoods_1) {
        this.categoryName = categoryName;
        this.tblFoods = tblFoods;
        this.tblFoods_1 = tblFoods_1;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)

    @Column(name = "CategoryID", unique = true, nullable = false)
    public Integer getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    @Column(name = "CategoryName", nullable = false, length = 500)
    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tblCategory")
    public Set<TblFood> getTblFoods() {
        return this.tblFoods;
    }

    public void setTblFoods(Set<TblFood> tblFoods) {
        this.tblFoods = tblFoods;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tblCategory")
    public Set<TblFood> getTblFoods_1() {
        return this.tblFoods_1;
    }

    public void setTblFoods_1(Set<TblFood> tblFoods_1) {
        this.tblFoods_1 = tblFoods_1;
    }

}